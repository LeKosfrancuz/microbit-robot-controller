let radio_group = 4
radio.setGroup(radio_group)
basic.showNumber(radio_group)
basic.forever(function on_forever() {
    if (input.buttonIsPressed(Button.B)) {
        while (input.buttonIsPressed(Button.B)) {
            radio.sendValue("stop", 1)
            basic.showIcon(IconNames.No)
        }
        radio.sendValue("stop", 0)
        basic.clearScreen()
    }
    
    let pitch = input.rotation(Rotation.Pitch)
    let roll = input.rotation(Rotation.Roll)
    let almost_zero_deg_tolerance = 15
    // if Math.abs(pitch) > 95 or Math.abs(roll) > 95:
    //     basic.show_icon(IconNames.NO)
    //     return
    // else:
    //     basic.clear_screen()
    console.log("Pitch: " + pitch + "°")
    console.log("Roll: " + roll + "°")
    let a_pitch = Math.abs(pitch)
    let a_roll = Math.abs(roll)
    if (a_pitch / a_roll < 1.5 && a_pitch / a_roll >= 0.5) {
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
        
    }
    
    if (a_pitch > a_roll) {
        if (a_pitch > almost_zero_deg_tolerance) {
            if (pitch > 0) {
                //  Nagnut nazad
                basic.showArrow(ArrowNames.South)
                console.log("Nagnut nazad: " + a_pitch + "°")
            } else if (pitch < 0) {
                //  Nagnut naprijed
                basic.showArrow(ArrowNames.North)
                console.log("Nagnut naprijed: " + a_pitch + "°")
            }
            
        }
        
    } else if (a_roll > almost_zero_deg_tolerance) {
        if (roll > 0) {
            //  Nagnut desno
            basic.showArrow(ArrowNames.East)
            console.log("Nagnut desno: " + a_roll + "°")
        } else if (roll < 0) {
            //  Nagnut lijevo
            basic.showArrow(ArrowNames.West)
            console.log("Nagnut lijevo: " + a_roll + "°")
        }
        
    }
    
})
input.onLogoDown(function on_logo_down() {
    
})
