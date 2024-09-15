import { Sprite } from "./types";

export const useGameValues = () => {
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
        velocity: 0,
        gravity: 0.25,

        draw: () => {
            if (!ctx.value) return;

            ctx.value.drawImage(
                sprites.value,
                flappyBird.sx, flappyBird.sy, // coordenadas referente aonde se localiza
                flappyBird.width, flappyBird.height, // Tamanho do recorte do sprite
                flappyBird.x, flappyBird.y, // Posicionamento no canvas
                flappyBird.width, flappyBird.height // Tamanho no canvas
            )
        },

        update: () => {
            flappyBird.velocity += flappyBird.gravity
            flappyBird.y += flappyBird.velocity
        }
    })

    const readyMessage = reactive({
        sy: 0,
        sx: 134,
        width: 174,
        height: 152,
        x: 0,
        y: 50,
        draw: () => {
            if (!ctx.value) return;

            ctx.value.drawImage(
                sprites.value,
                readyMessage.sx, readyMessage.sy, // coordenadas referente aonde se localiza
                readyMessage.width, readyMessage.height, // Tamanho do recorte do sprite
                readyMessage.x, readyMessage.y, // Posicionamento no canvas
                readyMessage.width, readyMessage.height // Tamanho no canvas
            )
        }
    })

    return {
        background,
        canvas,
        ctx,
        flappyBird,
        floor,
        readyMessage
    }
}

export const useScreens = () => {
    const setHome = (action: 'draw' | 'update', readyMessage: Sprite) => {
        if (action === 'draw') {
            readyMessage.draw()
        }
    }
    

    const setGame = (
        action: 'draw' | 'update',
        background: Sprite,
        floor: Sprite,
        flappyBird: Sprite,
    ) => {
        if (action === 'draw') {

            background.draw()
            floor.draw()
            flappyBird.draw()
        }
    

        if (action === 'update' && flappyBird.update) {    
            flappyBird.update()
        }
        
    }

    return {
        setHome,
        setGame,
    }
}
