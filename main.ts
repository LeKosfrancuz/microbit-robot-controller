let radio_group = 4
radio.setGroup(radio_group)
basic.showNumber(radio_group)
function calculate_motor_speed(): number[] {
    let pitch = input.rotation(Rotation.Pitch)
    let roll = input.rotation(Rotation.Roll)
    let almost_zero_deg_tolerance = 25
    // if Math.abs(pitch) > 95 or Math.abs(roll) > 95:
    //     basic.show_icon(IconNames.NO)
    //     return
    // else:
    //     basic.clear_screen()
    console.log("Pitch: " + pitch + "°")
    console.log("Roll: " + roll + "°")
    let a_pitch = Math.abs(pitch)
    let a_roll = Math.abs(roll)
    let l_motor = 0
    let r_motor = 0
    if (a_pitch / a_roll < 1.5 && a_pitch / a_roll >= 0.5) {
        //  Ako je jedan od smjerova preko tolerancije, dovoljno je za kretanje
        if (a_pitch > almost_zero_deg_tolerance || a_roll > almost_zero_deg_tolerance) {
            if (pitch > 0 && roll > 0) {
                basic.showArrow(ArrowNames.SouthEast)
            }
            
            if (pitch > 0 && roll < 0) {
                basic.showArrow(ArrowNames.SouthWest)
            }
            
            if (pitch < 0 && roll > 0) {
                basic.showArrow(ArrowNames.NorthEast)
            }
            
            if (pitch < 0 && roll < 0) {
                basic.showArrow(ArrowNames.NorthWest)
            }
            
            l_motor = -1 * pitch / 180 + roll / 180
            r_motor = -1 * pitch / 180 - roll / 180
        }
        
    } else if (a_pitch > a_roll) {
        if (a_pitch > almost_zero_deg_tolerance) {
            if (pitch > 0) {
                //  Nagnut nazad
                l_motor = -1 * a_pitch / 180
                r_motor = l_motor
                basic.showArrow(ArrowNames.South)
            } else if (pitch < 0) {
                //  Nagnut naprijed
                l_motor = a_pitch / 180
                r_motor = l_motor
                basic.showArrow(ArrowNames.North)
            }
            
        }
        
    } else if (a_roll > almost_zero_deg_tolerance) {
        if (roll > 0) {
            //  Nagnut desno
            l_motor = roll / 180
            r_motor = -1 * l_motor
            basic.showArrow(ArrowNames.East)
        } else if (roll < 0) {
            //  Nagnut lijevo
            l_motor = roll / 180
            r_motor = -1 * l_motor
            basic.showArrow(ArrowNames.West)
        }
        
    }
    
    return [l_motor, r_motor]
}

basic.forever(function on_forever() {
    if (input.buttonIsPressed(Button.B)) {
        while (input.buttonIsPressed(Button.B)) {
            radio.sendValue("stop", 1)
            basic.showIcon(IconNames.No)
        }
        radio.sendValue("stop", 0)
        basic.clearScreen()
    }
    
    let [l_motor, r_motor] = calculate_motor_speed()
    radio.sendValue("set_l_motor", l_motor)
    radio.sendValue("set_r_motor", r_motor)
    console.log("Left motor: " + l_motor)
    console.log("Right motor: " + r_motor)
})
input.onLogoDown(function on_logo_down() {
    
})
