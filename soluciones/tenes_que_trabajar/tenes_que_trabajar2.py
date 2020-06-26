from consola import leer_caracter
from consola import leer_entrada_completa
from consola import obtener_caracter
from consola import avanzar_caracter
from consola import hay_mas_caracteres
from consola import imprimir
from consola import cambiar_color_texto

def Tenes_que_trabajar():
  if sos_menor_de_edad() or sos_jubilado():
    imprimir('Podes irte de vacaciones')
  else:
    imprimir('Tenes que trabajar')

def sos_menor_de_edad():
  return leer_entrada_completa() <= 18

def sos_jubilado():
  return leer_entrada_completa() >= 65


Tenes_que_trabajar()
