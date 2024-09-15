export interface Sprite {
    sy: number;
    sx: number;
    width: number;
    height: number;
    x: number;
    y: number;
    draw: () => void;
    update?: () => void;
}