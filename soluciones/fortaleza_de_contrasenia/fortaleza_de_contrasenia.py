from consola import leer_caracter
from consola import leer_entrada_completa
from consola import obtener_caracter
from consola import avanzar_caracter
from consola import hay_mas_caracteres
from consola import imprimir
from consola import cambiar_color_texto

longitud = None

def Analizar_fortaleza():
  global longitud
  Longitud_de_contrase_C3_B1a()
  if 8 < longitud:
    cambiarColorTexto("#33cc00")
    imprimir('VERDE')
  else:
    if 5 > longitud:
      cambiarColorTexto("#ff4040")
      imprimir('ROJO')
    else:
      cambiarColorTexto("#ffff00")
      imprimir('AMARILLO')

def Longitud_de_contrase_C3_B1a():
  global longitud
  longitud = 0
  while hay_mas_caracteres():
    longitud = longitud + 1
    avanzar_caracter()


Analizar_fortaleza()
