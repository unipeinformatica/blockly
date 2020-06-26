from consola import leer_caracter
from consola import leer_entrada_completa
from consola import obtener_caracter
from consola import avanzar_caracter
from consola import hay_mas_caracteres
from consola import imprimir
from consola import cambiar_color_texto

pa_C3_ADs = None

def Preguntar_si_ya_llegamos___():
  global pa_C3_ADs
  obtener_nombre_pais()
  for count in range(12):
    imprimir('Ya llegamos a ' + str(str(pa_C3_ADs) + '\n'))

def obtener_nombre_pais():
  global pa_C3_ADs
  pa_C3_ADs = ''
  while hay_mas_caracteres():
    pa_C3_ADs = str(pa_C3_ADs) + str(obtener_caracter())


Preguntar_si_ya_llegamos___()
