from consola import leer_caracter
from consola import leer_entrada_completa
from consola import obtener_caracter
from consola import avanzar_caracter
from consola import hay_mas_caracteres
from consola import imprimir
from consola import cambiar_color_texto

def Tenes_que_trabajar():
  if leer_entrada_completa() > 18 and leer_entrada_completa() < 65:
    imprimir('Tenes que trabajar')
  else:
    imprimir('Podes irte de vacaciones')


Tenes_que_trabajar()
