from django.apps import AppConfig


class VoltagevikingsappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'VoltageVikingsApp'

    def ready(self):
        import VoltageVikingsApp.signals
