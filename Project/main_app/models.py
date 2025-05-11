from django.db import models
from django.contrib.auth.models import User

# создание Справочника ролей (расширение модели User)
class Profile(models.Model):
    ROLE_CHOICES = [
        ('client', 'Клиент'),  # все права по ТО и только просмотр для машин и рекламаций
        ('service', 'Сервисная компания'),  # все права, за исключением внесения данных по машинам
        ('manager', 'Менеджер'),  # условный администратор со всеми правами
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    # поля для сервисной компании
    company_name = models.CharField(max_length=128, blank=True, null=True)
    company_description = models.TextField(blank=True, null=True)

# создание Справочников для комплектующих машины
class Directory(models.Model):
    entity = models.CharField(max_length=256)
    name = models.CharField(max_length=256)
    description = models.TextField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


# ключевая модель Машины
class Machine(models.Model):
    serial_number = models.CharField(max_length=64, unique=True, verbose_name="Зав. № машины")

    model = models.ForeignKey(Directory,
                              on_delete=models.SET_NULL,
                              null=True,
                              related_name='machines_model',
                              verbose_name='Модель машины')

    engine = models.ForeignKey(Directory,
                               on_delete=models.SET_NULL,
                               null=True,
                               related_name='machines_engine',
                               verbose_name='Модель двигателя')

    engineID = models.CharField(max_length=256, verbose_name='Зав. № двигателя')

    transmission = models.ForeignKey(Directory,
                                     on_delete=models.SET_NULL,
                                     null=True,
                                     related_name='machines_transmission',
                                     verbose_name='Модель трансмиссии')

    transmissionID = models.CharField(max_length=256, verbose_name='Зав. № трансмиссии')

    drivingAxle = models.ForeignKey(Directory,
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    related_name='machines_drivingAxle',
                                    verbose_name='Модель ведущего моста')

    drivingAxleID = models.CharField(max_length=256, verbose_name='Зав. № ведущего моста')

    controlledAxle = models.ForeignKey(Directory,
                                       on_delete=models.SET_NULL,
                                       null=True,
                                       related_name='machines_controlledAxle',
                                       verbose_name='Модель управляемого моста')

    controlledAxleID = models.CharField(max_length=256, verbose_name='Зав. № управляемого моста')
    deliveryContract = models.CharField(max_length=512, verbose_name='Договор поставки №, дата')
    shipmentDate = models.DateField(verbose_name='Дата отгрузки с завода')
    recipient = models.CharField(max_length=256, verbose_name='Грузополучатель')
    deliveryAddress = models.CharField(max_length=256, verbose_name='Адрес поставки (эксплуатации)')
    equipment = models.CharField(max_length=1024, verbose_name='Комплектация')

    client = models.ForeignKey(User,
                               on_delete=models.SET_NULL,
                               null=True,
                               related_name='client_machines',
                               verbose_name='Клиент')

    serviceCompany = models.ForeignKey(User,
                                       on_delete=models.SET_NULL,
                                       null=True,
                                       related_name='service_machines',
                                       verbose_name='Сервисная компания')

    def __str__(self):
        return f"{self.serial_number}"

# модель Технического Обслуживания (ТО)
class Maintenance(models.Model):
    maintenanceType = models.ForeignKey(Directory,
                                        on_delete=models.SET_NULL,
                                        null=True,
                                        related_name='maintenance_type',
                                        verbose_name='Вид ТО')

    maintenanceDate = models.DateField(verbose_name='Дата проведения ТО')
    operating = models.IntegerField(verbose_name='Наработка, м/час')
    orderID = models.CharField(max_length=256, verbose_name='№ заказ-наряда')
    orderDate = models.DateField(verbose_name='Дата заказ-наряда')

    maintenance_org = models.ForeignKey(Directory,
                                        on_delete=models.SET_NULL,
                                        null=True,
                                        related_name='maintenance_orgs',  # Организация, фактически проводившая ТО
                                        verbose_name='Организация, проводившая ТО'
                                        )

    serviceCompany = models.ForeignKey(User,
                                       on_delete=models.SET_NULL,
                                       null=True,
                                       related_name='maintenance_services',  # закрепленная за машиной сервисная компания
                                       verbose_name='Сервисная компания')

    machine = models.ForeignKey(Machine,
                                on_delete=models.CASCADE,
                                null=True,
                                related_name='maintenance_machines',
                                verbose_name='Зав. № машины')

# модель Рекламации
class Complaint(models.Model):
    breakdownDate = models.DateField(verbose_name='Дата отказа (поломки)')
    operating = models.IntegerField(verbose_name='Наработка, м/час')

    breakdownNode = models.ForeignKey(Directory,
                                      on_delete=models.SET_NULL,
                                      null=True,
                                      related_name='breakdownNodes',
                                      verbose_name='Узел поломки')

    breakdownDescription = models.TextField(verbose_name='Описание поломки', null=True, blank=True)

    recoveryMethod = models.ForeignKey(Directory,
                                       on_delete=models.SET_NULL,
                                       null=True,
                                       related_name='recovery_methods',
                                       verbose_name='Способ восстановления')

    spareParts = models.CharField(max_length=1024, null=True, blank=True, verbose_name='Используемые запасные части')
    recoveryDate = models.DateField(verbose_name='Дата восстановления')

    downtime = models.PositiveIntegerField(verbose_name='Время простоя техники', null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.breakdownDate and self.recoveryDate:
            self.downtime = (self.recoveryDate - self.breakdownDate).days
        super().save(*args, **kwargs)

    machine = models.ForeignKey(Machine,
                                on_delete=models.CASCADE,
                                null=True,
                                related_name='complaint_machines',
                                verbose_name='Зав. № машины')

    serviceCompany = models.ForeignKey(User,
                                       on_delete=models.SET_NULL,
                                       null=True,
                                       related_name='complaint_services',  # закрепленная за машиной сервисная компания
                                       verbose_name='Сервисная компания')










