radio_group = 4
radio.set_group(radio_group)
basic.show_number(radio_group)

def on_forever():
    if input.button_is_pressed(Button.B):
        while input.button_is_pressed(Button.B):
            radio.send_value("stop", 1)
            basic.show_icon(IconNames.NO)
        radio.send_value("stop", 0)
        basic.clear_screen()
    
    (l_motor, r_motor) = calculate_motor_speed()
    
    radio.send_value("set_l_motor", l_motor)
    radio.send_value("set_r_motor", r_motor)
    print("Left motor: " + l_motor)
    print("Right motor: " + r_motor)
    

def calculate_motor_speed():
    pitch = input.rotation(Rotation.PITCH)
    roll  = input.rotation(Rotation.ROLL)
    almost_zero_deg_tolerance = 25

    #if Math.abs(pitch) > 95 or Math.abs(roll) > 95:
    #    basic.show_icon(IconNames.NO)
    #    return
    #else:
    #    basic.clear_screen()

    print("Pitch: "+(pitch)+"°")
    print("Roll: "+(roll)+"°")
    a_pitch = Math.abs(pitch)
    a_roll  = Math.abs(roll)

    l_motor = 0
    r_motor = 0

    if a_pitch/a_roll < 1.5 and a_pitch/a_roll >= 0.5:
        # Ako je jedan od smjerova preko tolerancije, dovoljno je za kretanje
        if a_pitch > almost_zero_deg_tolerance or a_roll > almost_zero_deg_tolerance:
            if pitch > 0 and roll > 0:
                basic.show_arrow(ArrowNames.SOUTH_EAST)
            if pitch > 0 and roll < 0:
                basic.show_arrow(ArrowNames.SOUTH_WEST)
            if pitch < 0 and roll > 0:
                basic.show_arrow(ArrowNames.NORTH_EAST)
            if pitch < 0 and roll < 0:
                basic.show_arrow(ArrowNames.NORTH_WEST)
            l_motor = -1*pitch/180 + roll/180
            r_motor = -1*pitch/180 - roll/180
    elif a_pitch > a_roll:
        if a_pitch > almost_zero_deg_tolerance:
            if pitch > 0: # Nagnut nazad
                l_motor = -1*a_pitch/180
                r_motor = l_motor
                basic.show_arrow(ArrowNames.SOUTH)
            elif pitch < 0: # Nagnut naprijed
                l_motor = a_pitch/180
                r_motor = l_motor
                basic.show_arrow(ArrowNames.NORTH)
    else:
        if a_roll > almost_zero_deg_tolerance:
            if roll > 0: # Nagnut desno
                l_motor = roll/180
                r_motor = -1*l_motor
                basic.show_arrow(ArrowNames.EAST)
            elif roll < 0: # Nagnut lijevo
                l_motor = roll/180
                r_motor = -1*l_motor
                basic.show_arrow(ArrowNames.WEST)

    return (l_motor, r_motor)

basic.forever(on_forever)

def on_logo_down():
    pass
input.on_logo_down(on_logo_down)