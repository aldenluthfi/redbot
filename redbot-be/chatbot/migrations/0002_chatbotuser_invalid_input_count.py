from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("chatbot", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="chatbotuser",
            name="invalid_input_count",
            field=models.PositiveSmallIntegerField(default=0),
        ),
    ]
