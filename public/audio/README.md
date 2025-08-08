# Audio Files Setup

## Ubicación de los archivos de audio

Los archivos de audio deben colocarse en la carpeta `public/audio/` con los siguientes nombres:

```
public/
  audio/
    intro.mp3        # Para la slide de bienvenida
    romantic.mp3     # Para la slide "Personas Especiales"  
    thoughtful.mp3   # Para la slide "Por qué tú"
    upbeat.mp3       # Para la slide "Datos Curiosos"
    fun.mp3          # Para la slide "Razones Para Ser Amigos"
    curious.mp3      # Para la slide "¿Qué me gustaría saber?"
    hopeful.mp3      # Para la slide "Call to Action"
    ending.mp3       # Para la slide final
```

## Configuración de audio

Cada slide tiene configurado en `data.json` un rango de loop específico:

```json
"audio": {
  "src": "/audio/intro.mp3",
  "loop": {
    "start": 0,    // Segundo donde inicia el loop
    "end": 45      // Segundo donde termina el loop
  }
}
```

## Características del reproductor

- **Posición**: Flotante en la esquina superior izquierda
- **Controles**: Solo play/pause (no saltar canciones)
- **Modo**: Loop automático en el rango especificado
- **Volumen**: 60% por defecto
- **Responsive**: Se adapta al slide actual automáticamente
- **Visual**: Indicadores animados cuando está reproduciendo

## Formatos soportados

- MP3 (recomendado)
- WAV
- OGG
- M4A

## Notas importantes

1. Los archivos de audio no están incluidos en el repositorio
2. Asegúrate de que los archivos sean relativamente pequeños para una carga rápida
3. El reproductor maneja errores de carga automáticamente
4. Si un archivo no se encuentra, el reproductor no se mostrará para esa slide

## Ejemplo de uso

El reproductor cambiará automáticamente la música según la slide activa. Cada transición pausará la música anterior e iniciará la nueva (si está disponible).
