<script setup lang="ts">
import { useGameValues, useScreens } from './main'

const { background, canvas, ctx, flappyBird, floor, readyMessage } = useGameValues();
const { setGame, setHome } = useScreens();

const prepareValues = () => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d') as CanvasRenderingContext2D
    background.y = canvas.value.height - 204
    floor.y = canvas.value.height - 112
    readyMessage.x = (canvas.value.width / 2) - 174 / 2
  }
}

const home = () => {
  readyMessage.draw()
}

const game = () => {
  background.draw()
  floor.draw()
  flappyBird.draw()
  flappyBird.update()
}

onMounted(() => {
  if (canvas.value) {
    prepareValues();
    const loopGame = () => {
      
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