Feature: US10 - Modo sin conexión para rutas guardadas
  Como turista
  Quiero acceder a las rutas guardadas sin conexión a internet
  Para continuar mi recorrido sin interrupciones

  Scenario: E1: Acceder a ruta guardada en modo sin conexión
    Given que el usuario ha guardado una ruta en su perfil
    And no tiene conexión a internet
    When accede a la sección "Rutas Guardadas"
    Then el sistema permite acceder a la <ruta en modo offline>

    Examples: INPUT
    | ruta guardada                |
    | Ruta 18 - Miraflores a Barranco |

  Scenario: E2: Mostrar advertencia cuando una ruta no está disponible sin conexión
    Given que el usuario intenta acceder a una ruta guardada sin conexión
    And la ruta no está disponible en modo offline
    When intenta ver la ruta
    Then el sistema muestra un <mensaje de advertencia> indicando que necesita conexión a internet

    Examples: OUTPUT
    | mensaje de advertencia                         |
    | Esta ruta no está disponible sin conexión. Conéctese a internet para acceder |

  Scenario: E3: Sincronizar información de rutas guardadas al recuperar conexión
    Given que el usuario ha accedido a una ruta guardada sin conexión
    And la conexión a internet se ha restaurado
    When vuelve a la sección "Rutas Guardadas"
    Then el sistema sincroniza la <información de la ruta> y actualiza los tiempos de llegada en tiempo real

    Examples: OUTPUT
    | información de la ruta                        |
    | Ruta 18 - Miraflores a Barranco, tiempos de llegada actualizados |
