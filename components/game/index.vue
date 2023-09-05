<script setup lang="ts">
import useGame from './main'

const { background, canvas, ctx, flappyBird, floor } = useGame();

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
  width: 320px;
  height: 480px;
  box-shadow: 2px 0 0 rgba(0, 0, 0, 0.25);
  }
</style>