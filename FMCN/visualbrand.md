# Análisis del estilo visual y criterios de UX del sitio FMCN

## Información general y misión

El sitio `fmcn.org` corresponde al **Fondo Mexicano para la Conservación de la Naturaleza (FMCN)**. En la página principal se observa un _hero section_ a pantalla completa con imágenes de paisajes naturales y el lema **“Sustentar nuestro tesoro natural”**. Debajo del lema se explica que FMCN es una institución que **canaliza recursos financieros y vincula a actores para proteger la riqueza natural del país**. Los principales enlaces de navegación son "Quiénes somos", "Nuestro trabajo", "Convocatorias", "Publicaciones", "Noticias" y "Contacto", lo que sugiere una arquitectura de información centrada en su misión y programas.

### Idiomas y accesibilidad

El sitio es **bilingüe**, con un interruptor en la barra de navegación que permite cambiar entre **ESPAÑOL e ENGLISH**. La mayoría del contenido se carga por defecto en español, pero las páginas tienen contrapartes en inglés (por ejemplo, `en.fmcn.org`). Para nuevas páginas es importante:

- Añadir un selector de idioma visible y claro en la parte superior de la página, coherente con el estilo de la barra de navegación.
- Proporcionar traducciones completas y consistentes del contenido. Evitar mezclar idiomas en la misma página.

## Estilo visual

### Tipografía

El código fuente indica que el sitio utiliza la familia **Lato** de Google Fonts para algunos elementos. El _body_ de la plantilla utiliza **Open Sans, Arial y sans‑serif**. Los encabezados y botones muestran un estilo sans‑serif grueso con bastante interletraje, lo que aporta modernidad y claridad. Para mantener la armonía en nuevas páginas:

- Utilice **Lato** para títulos y subtítulos, y **Open Sans** para el texto de párrafo y formularios.
- Asegure tamaños de fuente jerárquicos claros: títulos grandes (~30 px), subtítulos (~26 px) y cuerpo (14–18 px) como sugiere la plantilla de Divi.

### Paleta de colores

El estilo visual combina **imágenes de alta calidad de paisajes** con **superposiciones de color semitransparentes** para garantizar legibilidad. La fuente de estilos muestra que el encabezado secundario utiliza un color **amarillo‑oliva (#a7a337)**. Además, el botón principal de suscripción y elementos destacados presentan tonos **turquesa/verde azulado**, mientras que los fondos neutros son blancos o gris claro. Recomendaciones:

- Mantener el **contraste alto** entre texto y fondo usando blanco sobre fondos oscuros y negro o gris oscuro sobre fondos claros.
- Emplear la **paleta institucional** (turquesa, azul petróleo y amarillo‑oliva) de forma consistente en botones, enlaces y fondos secundarios. Consulte la hoja de estilos para recuperar los códigos hexadecimales (por ejemplo, `#a7a337` para el encabezado).
- Utilizar **filtros de color sobre fotografías** para unificar el tono y mejorar la legibilidad del texto superpuesto.

### Imágenes y multimedia

Las fotografías ocupan un papel central. El _hero_ inicial muestra un paisaje con un degradado oscuro que permite colocar texto en blanco arriba. Otras secciones usan imágenes de proyectos (“Conservación”, “Manejo sostenible”, “Desarrollo de capacidades”), lo que refuerza la narrativa. Para nuevas páginas:

- Seleccionar imágenes de **alta resolución** relacionadas con la conservación y la naturaleza, procurando que sean coherentes en iluminación y tono.
- Aplicar **degradados u overlays** en tonos de la paleta institucional para permitir la legibilidad del texto.
- Optimizar tamaños de imagen para no afectar la velocidad de carga.

### Componentes de interfaz y disposición

El diseño utiliza el tema **Divi** y se basa en secciones de ancho completo con márgenes generosos. Los bloques están bien definidos y separados por espacios negativos. La sección de proyectos se divide en tres columnas con títulos grandes y descripciones breves. La sección de noticias presenta tarjetas con imagen, titular, fecha y extracto. La parte inferior contiene un **formulario de suscripción** donde se solicita nombre, apellido y correo electrónico. Puntos a considerar:

- Mantener **jerarquía visual** mediante tamaños de fuente, color y espaciado para guiar al usuario. Utilice títulos grandes para secciones y cuerpos de texto bien espaciados.
- Asegurar que los **botones** sean fácilmente identificables (por ejemplo, color sólido, bordes redondeados) y tengan suficiente área interactiva.
- Respetar la **alineación centrada** presente en la mayoría de los encabezados y llamadas a la acción.
- Proporcionar **formularios simples** con etiquetas claras y campos obligatorios mínimos, siguiendo el diseño del formulario de suscripción.

### Accesibilidad y experiencia de usuario

- Utilizar etiquetas y atributos `aria` apropiados para navegadores y lectores de pantalla. La alternancia de idiomas y la navegación deben ser accesibles mediante teclado.
- Asegurar que el contraste de color cumpla con las pautas WCAG (ratio ≥ 4.5:1) para texto estándar. El color del encabezado (#a7a337) sobre blanco o negro debe contrastar adecuadamente.
- Implementar **diseño responsivo**: el sitio usa secciones que se adaptan a pantallas móviles. Mantenga columnas que se apilen verticalmente en dispositivos pequeños.

## Criterios de coherencia para nuevas páginas

Para que las nuevas páginas mantengan la armonía visual y la experiencia de usuario del sitio FMCN, se recomienda:

1. **Consistencia tipográfica y de colores**: utilice las mismas fuentes (Lato para encabezados y Open Sans para cuerpo) y colores institucionales identificados en la hoja de estilos.
2. **Imágenes con superposiciones**: seleccione fotografías relacionadas con la naturaleza y aplique overlays en tonos turquesa o verde para garantizar la legibilidad del texto.
3. **Navegación clara**: mantenga la estructura de navegación con las principales secciones y el selector de idioma. Evite menús excesivamente profundos para no perder claridad.
4. **Jerarquía visual y espaciado**: siga el patrón de secciones de ancho completo con suficiente espacio en blanco. Utilice tarjetas para organizar noticias o proyectos y títulos grandes para diferenciar secciones.
5. **Accesibilidad y respuesta**: implemente páginas responsivas, con contraste de color adecuado y formularios sencillos. Verifique que la navegación y los formularios sean accesibles mediante teclado y dispositivos de asistencia.

Al aplicar estos criterios, las nuevas páginas se integrarán visualmente con el diseño actual de FMCN y ofrecerán una experiencia de usuario coherente y profesional.