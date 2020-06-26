from consola import leer_caracter
from consola import leer_entrada_completa
from consola import obtener_caracter
from consola import avanzar_caracter
from consola import hay_mas_caracteres
from consola import imprimir
from consola import cambiar_color_texto

def ASPO():
  for count in range(int(leer_entrada_completa())):
    Preguntar_si_termin_C3_B3()

def Preguntar_si_termin_C3_B3():
  imprimir('Alberto, terminó la cuarentena?')
  imprimir('\n')
  imprimir('No.')
  imprimir('\n')


ASPO()
