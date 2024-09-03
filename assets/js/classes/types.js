import Animal from "./animal.js";

const audioPlayer = document.getElementById("player");

class Leon extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    Rugir() {
        audioPlayer.src = `assets/sounds/${this.getSonido()}`; "assets/sounds/" + this.getSonido()
        audioPlayer.play();
    }
}

class Lobo extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    Aullar() {
        audioPlayer.src = `assets/sounds/${this.getSonido()}`;
        audioPlayer.play();
    }
}

class Oso extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    Grunir() {
        audioPlayer.src = `assets/sounds/${this.getSonido()}`;
        audioPlayer.play();
    }
}

class Serpiente extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    Sisear() {
        audioPlayer.src = `assets/sounds/${this.getSonido()}`;
        audioPlayer.play();
    }
}

class Aguila extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    Chillar() {
        audioPlayer.src = `assets/sounds/${this.getSonido()}`;
        audioPlayer.play();
    }
}

export { Leon, Lobo, Oso, Serpiente, Aguila };
