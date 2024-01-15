// ChatGPT was used for learning purposes such as how to optimize my code.

class ButtonCreator {
    constructor(outputId) {
        this.outputContainer = document.getElementById(outputId);
        this.buttonOrder = [];
        this.userClickOrder = [];
    }

    createButtons() {
        const num = parseInt(document.getElementById("n").value);
        if (!isNaN(num) && num >= 3 && num <= 7) {
            this.outputContainer.innerHTML = ''; 
            this.buttonOrder = []; // Reset the button order
            this.userClickOrder = []; // Reset the user click order
            for (let i = 0; i < num; i++) {
                const button = this.createButton(i);
                this.outputContainer.appendChild(button);
                this.buttonOrder.push(i); // Store the order of buttons
            }
        } else {
            alert(messages.enterNumber);
        }
    }

    createButton(index) {
        const button = document.createElement("button");
        button.className = "dynamic-button";

        // Create a span element for the number
        const numberSpan = document.createElement("span");
        numberSpan.innerText = index + 1;

        // Set random color for the button
        button.style.backgroundColor = this.getRandomColor();

        // Append the number span to the button
        button.appendChild(numberSpan);

        button.onclick = () => this.checkOrder(index, numberSpan);
        return button;
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF'; // all the valid characters in a hexadecimal color code
        let color = '#';
        for (let i = 0; i < 6; i++) { // 6 tiimes because a hexadecimal color code is 6 characters long
            color += letters[Math.floor(Math.random() * 16)]; //  retrieves a random character from the letters string
        } // * 16 because each digit can take on 16 different values (0-9 and A-F)
        return color;
    }

    startRandomMovement() {
        const num = parseInt(document.getElementById("n").value);
        if (!isNaN(num) && num >= 3 && num <= 7) {
            setTimeout(() => {
                for (let i = 0; i < num; i++) {
                    setTimeout(() => {
                        this.randomlyPositionButtons();
                    }, i * 2000); // Move buttons every 2 seconds
                }

                // After the buttons have finished moving, hide the numbers
                setTimeout(() => {
                    this.hideNumbers();
                }, num * 2000);
            }, num * 1000); // Initial delay based on number of buttons
        }
    }

    hideNumbers() {
        const buttons = this.outputContainer.children;
        for (let button of buttons) {
            const numberSpan = button.querySelector("span");
            if (numberSpan) {
                numberSpan.style.visibility = 'hidden';
            }
        }
    }

    randomlyPositionButtons() {
        const buttons = this.outputContainer.children;
        for (let button of buttons) {
            const { offsetX, offsetY } = this.getRandomPosition();
            button.style.position = 'fixed';  // to position relative to the viewport
            button.style.left = offsetX + 'px';
            button.style.top = offsetY + 'px';
        }
    }

    getRandomPosition() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Use the values from style.css
        const buttonWidth = 10 * parseFloat(getComputedStyle(document.querySelector('.dynamic-button')).width); 
        const buttonHeight = 5 * parseFloat(getComputedStyle(document.querySelector('.dynamic-button')).height); 

        const offsetX = Math.random() * (viewportWidth - buttonWidth);
        const offsetY = Math.random() * (viewportHeight - buttonHeight);

        return { offsetX, offsetY };
    }

    checkOrder(index, button) {
        this.userClickOrder.push(index);
        if (this.userClickOrder.length <= this.buttonOrder.length) {
            if (this.userClickOrder.every((val, idx) => val === this.buttonOrder[idx])) {
                button.style.visibility = 'visible'; // Show the number on the button
                if (this.userClickOrder.length === this.buttonOrder.length) {
                    alert(messages.excellentMemory);
                }
            } else {
                this.revealButtons();
                alert(messages.wrongOrder);
            }
        }
    }

    revealButtons() {
        const buttons = this.outputContainer.children;
        for (let button of buttons) {
            button.style.visibility = 'visible';
        }
    }
}

const buttonCreator = new ButtonCreator("output");
