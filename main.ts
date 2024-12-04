function sub_tolerance (pivot: number, tolerance: number) {
    if (pivot > 0 && pivot - tolerance > 0) {
        return pivot - tolerance
    }
    if (pivot < 0 && pivot + tolerance < 0) {
        return pivot + tolerance
    }
    return 0
}

function map(x: number, in_min: number, in_max: number, out_min: number, out_max: number) : number {
    if (x < in_min) return out_min;
    if (x > in_max) return out_max;
    
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
function calculate_motor_speed () {
    pitch = input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
    if (roll > 90) {
        roll = 90
    } else if (roll < -90) {
        roll = -90
    }
    if (pitch > 90) {
        pitch = 90
    } else if (pitch < -90) {
        pitch = -90
    }
    almost_zero_deg_tolerance = 25
    console.log("Pitch: " + pitch + "°")
    console.log("Roll: " + roll + "°")
    a_pitch = Math.abs(pitch)
    a_roll = Math.abs(roll)
    l_motor = 0
    r_motor = 0
    right = roll > 0
    forward = pitch < 0
    if (a_pitch - a_roll < almost_zero_deg_tolerance && a_pitch - a_roll > -1*almost_zero_deg_tolerance) {
        // Ako je jedan od smjerova preko tolerancije, dovoljno je za kretanje
        if (a_pitch > almost_zero_deg_tolerance || a_roll > almost_zero_deg_tolerance) {
            if (!forward) {
                if (right) {
                    basic.showArrow(ArrowNames.SouthEast)
                } else {
                    basic.showArrow(ArrowNames.SouthWest)
                }
                l_motor = map((-1 * pitch - roll/2), -90-45, 90+45, -1, 1);
                r_motor = map((-1 * pitch + roll / 2), -90-45, 90 + 45, -1, 1);
            }
            if (forward) {
                if (right) {
                    basic.showArrow(ArrowNames.NorthEast)
                } else {
                    basic.showArrow(ArrowNames.NorthWest)
                }
                l_motor = map((-1 * pitch + roll / 2), -90 - 45, 90 + 45, -1, 1);
                r_motor = map((-1 * pitch - roll / 2), -90 - 45, 90 + 45, -1, 1);
            }
            return [l_motor, r_motor]
        }
    } else if (a_pitch > a_roll) {
        if (a_pitch > almost_zero_deg_tolerance) {
            //a_pitch -= almost_zero_deg_tolerance / 2
            if (!forward) {
                // Nagnut nazad
                l_motor = map(-1 * a_pitch, -90, 90, -1, -1);
                r_motor = l_motor
                basic.showArrow(ArrowNames.South)
            } else if (forward) {
                // Nagnut naprijed
                l_motor = map(a_pitch, -90, 90, -1, 1);
                r_motor = l_motor
                basic.showArrow(ArrowNames.North)
            }
        }
    } else if (a_roll > almost_zero_deg_tolerance) {
        a_roll -= almost_zero_deg_tolerance / 2
        if (right) {
            // Nagnut desno
            l_motor = a_roll / 90
            //r_motor = -1 * l_motor
            r_motor = 0
            basic.showArrow(ArrowNames.East)
        } else if (!right) {
            // Nagnut lijevo
            r_motor = a_roll / 90
            //l_motor = -1 * l_motor
            l_motor = 0
            basic.showArrow(ArrowNames.West)
        }
    }
    return [l_motor, r_motor]
}
let forward : boolean = false
let right : boolean = false
let a_roll : number = 0
let a_pitch : number = 0
let almost_zero_deg_tolerance : number = 0
let l_motor = 0
let r_motor = 0
let pitch = 0
let roll = 0
let radio_group : int8 = 4
let base_speed = 60
radio.setGroup(radio_group)
basic.showNumber(radio_group)
input.onLogoDown(function on_logo_down() {
    
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.B)) {
        while (input.buttonIsPressed(Button.B)) {
            radio.sendValue("stop", 1)
            basic.showIcon(IconNames.No)
            if (input.buttonIsPressed(Button.AB)) {
                radio.sendValue("stop", 0)
                radio_group = (radio_group % 5) + 1;
                radio.setGroup(radio_group)
                basic.showNumber(radio_group)
                while (input.buttonIsPressed(Button.AB));
            }
        }
        radio.sendValue("stop", 0)
        basic.clearScreen()
    }


    let sm : number = 1;
    if (input.buttonIsPressed(Button.A)) sm = 2;

    let [l_motor, r_motor] = calculate_motor_speed()
    l_motor *= base_speed
    r_motor *= base_speed
    radio.sendValue("set_lmtr", sm*l_motor);
    radio.sendValue("set_rmtr", sm*r_motor);
    console.log("Left motor: " + sm*l_motor)
    console.log("Right motor: " + sm*r_motor)
    if (l_motor == 0 && r_motor == 0) {
        basic.clearScreen()
    }
})