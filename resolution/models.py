from django.db import models

# Create your models here.
class Resolution(models.Model):
    id = models.AutoField(primary_key=True)
    height = models.IntegerField()
    width = models.IntegerField()
    pixel_density = models.DecimalField(max_digits=9,decimal_places=6)
    time_stamp = models.DateTimeField('date created', auto_now_add=True)
    
    @classmethod
    def create(cls, height, width, pixel_density):
        resolution = cls(title=title, heigh=height,pixel_density=pixel_density)
        # do something with the book
        return resolution
