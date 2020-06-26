# -*- coding: utf-8 -*-
import sys

if len(sys.argv) != 2:
    entrada = ''
else:
    entrada = sys.argv[1]
posicion_actual = 0


def leer_caracter():
    """ Retorna el carácter actual de 'entrada' según la 'posición actual'.

        La 'entrada' es una cadena que se recibe cómo argumento durante la
        invocación del programa.
        La 'posición actual' se puede cambiar mediante el procedimiento
        'avanzar_caracter()'.
    """
    return entrada[posicion_actual]


def leer_entrada_completa():
    """ Retorna la cadena de 'entrada' completa.
    """
    return entrada


def obtener_caracter():
    """ Retorna el carácter actual de 'entrada' y anvanza la 'posición actual'.
    """
    avanzar_caracter()
    return entrada[posicion_actual-1]


def imprimir(expresion):
    """ Imprime en la consola el valor recibido. No agrega un salto de línea.

    Parámetro:
    'valor' -- Expresión a imprimir.
    """
    print(expresion, end="")


def avanzar_caracter():
    """ Avanza la 'posición actual' en la cadena de 'entrada'

    Excepciones:
    'FinDeEntrada' -- Cuando se invoque estando ya en la última posición.
    """
    global posicion_actual
    if hay_mas_caracteres():
        posicion_actual += 1
    else:
        raise NameError('FinDeEntrada')
    return


def hay_mas_caracteres():
    """ Retorna 'True' si no se activó 'FinDeEntrada', si no retorna 'False'.
    """
    return posicion_actual < len(entrada)


def cambiar_color_texto(color):
    """ Cambia el color del texto.

    Parámetro:
    'color' -- Una cadena de texto donde: el primer caractér es sismpre '#'
               Los siguientes corresponden a los valores en formato hexadecial
               de los componentes de color rojo, verde y azul (RGB)

    Excepciones:
    'ColorInválido' -- Si el argumento no tiene el formato esperado.
    """
    try:
        if color[0:1] != '#':
            raise NameError('ColorInválido')
        r = int(color[1:3], 16)
        g = int(color[3:5], 16)
        b = int(color[5:7], 16)
    except ValueError:
        raise NameError('ColorInválido')

    print('\x1B[38;2;{0};{1};{2}m'.format(r, g, b), end="")
    return
