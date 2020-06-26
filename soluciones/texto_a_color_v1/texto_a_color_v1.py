from consola import leer_caracter
from consola import leer_entrada_completa
from consola import obtener_caracter
from consola import avanzar_caracter
from consola import hay_mas_caracteres
from consola import imprimir
from consola import cambiar_color_texto

def Texto_a_color():
  while hay_mas_caracteres():
    Decidir_color_de_texto()
    Imprimir_si_no_es_un_n_C3_BAmero()
    avanzar_caracter()

def Decidir_color_de_texto():
  if '1' == leer_caracter():
    cambiar_color_texto("#3366ff")
  if '2' == leer_caracter():
    cambiar_color_texto("#ff4040")

def Imprimir_si_no_es_un_n_C3_BAmero():
  if not ('1' == leer_caracter() or '2' == leer_caracter()):
    imprimir(leer_caracter())


Texto_a_color()
