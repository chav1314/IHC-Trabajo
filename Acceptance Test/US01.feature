Feature: US01 - Creación de cuenta del usuario
  Como turista o provinciano
  Quiero poder crear una cuenta en la aplicación
  Para acceder a todas las funcionalidades y personalizar mi experiencia

  Scenario: E1: Crear cuenta nueva con datos válidos
    Given que el usuario está en la pantalla de "Crear cuenta"
    And el sistema verifica que el correo no está registrado
    When el usuario ingresa <Nombre> <Apellido> <Correo> <Contraseña>
    And da clic en el botón "Registrar"
    Then el sistema valida los datos y muestra un <mensaje de éxito> indicando que la cuenta ha sido creada

    Examples: INPUT
    | Nombre   | Apellido | Correo                  | Contraseña |
    | chungo      |     rodriguez    | chungo.rodriguez@gmail.com   | pass1234   |

    Examples: OUTPUT
    | mensaje de éxito                  |
    | Cuenta creada exitosamente.       |
    | Redirigido a la pantalla de login |

  Scenario: E2: Intentar crear cuenta con un correo ya registrado
    Given que el usuario está en la pantalla de "Crear cuenta"
    And ingresa un correo ya registrado: <Correo>
    When el usuario intenta crear una cuenta
    Then el sistema muestra un <mensaje de error> indicando que el correo ya está registrado
    And el usuario es redirigido a la opción de "Iniciar sesión"

    Examples: INPUT
    | Correo                |
    | chungo.rodriguez@gmail.com |

    Examples: OUTPUT
    | mensaje de error                                |
    | Correo ya registrado. Inicie sesión o recupere su contraseña |

  Scenario: E3: Crear cuenta con contraseña no válida
    Given que el usuario está en la pantalla de "Crear cuenta"
    And ingresa una contraseña que no cumple con los requisitos de seguridad
    When el usuario intenta crear la cuenta
    Then el sistema muestra un <mensaje de advertencia> indicando que la contraseña es débil
    And sugiere que la contraseña tenga al menos 8 caracteres, una mayúscula y un número

    Examples: INPUT
    | Contraseña |
    | pass       |

    Examples: OUTPUT
    | mensaje de advertencia |
    | Contraseña débil. Use al menos 8 caracteres, una mayúscula y un número |
