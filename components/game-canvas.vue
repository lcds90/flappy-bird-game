<script setup lang="ts">
const canvas = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>()
const sprites = computed(() => {
  const sprites = new Image();
  sprites.src = './sprites.png'
  return sprites
})

const background = reactive({
  sy: 0,
  sx: 390,
  width: 275,
  height: 204,
  x: 0,
  y: 0,
  draw: () => {

    if (ctx.value && canvas.value) {

      ctx.value.fillStyle = '#70c5ce'
      ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)

      ctx.value.drawImage(
        sprites.value,
        background.sx, background.sy, // coordenadas referente aonde se localiza
        background.width, background.height, // Tamanho do recorte do sprite
        background.x, background.y, // Posicionamento no canvas
        background.width, background.height // Tamanho no canvas
      )

      ctx.value.drawImage(
        sprites.value,
        background.sx, background.sy, // coordenadas referente aonde se localiza
        background.width, background.height, // Tamanho do recorte do sprite
        (background.x + background.width), background.y, // Posicionamento no canvas
        background.width, background.height // Tamanho no canvas
      )
    }
  }
})

const floor = reactive({
  sy: 610,
  sx: 0,
  width: 224,
  height: 112,
  x: 0,
  y: 0,
  draw: () => {
    if (!ctx.value) return;

    ctx.value.drawImage(
      sprites.value,
      floor.sx, floor.sy, // coordenadas referente aonde se localiza
      floor.width, floor.height, // Tamanho do recorte do sprite
      floor.x, floor.y, // Posicionamento no canvas
      floor.width, floor.height // Tamanho no canvas
    )

    ctx.value.drawImage(
      sprites.value,
      floor.sx, floor.sy, // coordenadas referente aonde se localiza
      floor.width, floor.height, // Tamanho do recorte do sprite
      (floor.x + floor.width), floor.y, // Posicionamento no canvas
      floor.width, floor.height // Tamanho no canvas
    )
  }
})

const flappyBird = reactive({
  sy: 0,
  sx: 0,
  width: 33,
  height: 24,
  x: 10,
  y: 50,

  draw: () => {
    if (!ctx.value) return;

    ctx.value.drawImage(
      sprites.value,
      flappyBird.sx, flappyBird.sy, // coordenadas referente aonde se localiza
      flappyBird.width, flappyBird.height, // Tamanho do recorte do sprite
      flappyBird.x, flappyBird.y, // Posicionamento no canvas
      flappyBird.width, flappyBird.height // Tamanho no canvas
    )
  }
})

onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d') as CanvasRenderingContext2D
    background.y = canvas.value.height - 204
    floor.y = canvas.value.height - 112

    const loopGame = () => {
      background.draw()
      floor.draw()
      flappyBird.draw()
      requestAnimationFrame(loopGame)
    }


    loopGame()

  }
})

</script>

<template>
    <canvas ref="canvas" class="game-canvas" width="320" height="480"></canvas>
</template>

<style scoped>
.game-canvas {
  margin: 0 auto;
  border: 1px solid #000;
  display: block;
}
</style>