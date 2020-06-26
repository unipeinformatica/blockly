from consola import leer_caracter
from consola import leer_entrada_completa
from consola import obtener_caracter
from consola import avanzar_caracter
from consola import hay_mas_caracteres
from consola import imprimir
from consola import cambiar_color_texto

def Vi_un_avi_C3_B3n():
  Analizar_la_entrada()

def Analizar_la_entrada():
  while hay_mas_caracteres():
    Imprimir__22vi_un_avi_C3_B3n_22_si_hay_una_a()
    avanzar_caracter()

def Imprimir__22vi_un_avi_C3_B3n_22_si_hay_una_a():
  if leer_caracter() == 'a':
    imprimir('Vi un avión')
    imprimir('\n')


Vi_un_avi_C3_B3n()
