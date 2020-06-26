from consola import leer_caracter
from consola import leer_entrada_completa
from consola import leer_numero
from consola import obtener_caracter
from consola import avanzar_caracter
from consola import hay_mas_caracteres
from consola import imprimir
from consola import cambiar_color_texto

def Tenes_que_trabajar():
  if not sos_menor_de_edad() and not sos_jubilado():
    imprimir('Tenes que trabajar')
  else:
    imprimir('Podes irte de vacaciones')

def sos_menor_de_edad():
  return leer_numero() <= 18

def sos_jubilado():
  return leer_numero() >= 65


Tenes_que_trabajar()
