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
    
    pitch = input.rotation(Rotation.PITCH)
    roll  = input.rotation(Rotation.ROLL)
    almost_zero_deg_tolerance = 15

    #if Math.abs(pitch) > 95 or Math.abs(roll) > 95:
    #    basic.show_icon(IconNames.NO)
    #    return
    #else:
    #    basic.clear_screen()

    print("Pitch: "+(pitch)+"°")
    print("Roll: "+(roll)+"°")
    a_pitch = Math.abs(pitch)
    a_roll  = Math.abs(roll)

    if a_pitch/a_roll < 1.5 and a_pitch/a_roll >= 0.5:
        if pitch > 0 and roll > 0:
            basic.show_arrow(ArrowNames.SOUTH_EAST)
        if pitch > 0 and roll < 0:
            basic.show_arrow(ArrowNames.SOUTH_WEST)
        if pitch < 0 and roll > 0:
            basic.show_arrow(ArrowNames.NORTH_EAST)
        if pitch < 0 and roll < 0:
            basic.show_arrow(ArrowNames.NORTH_WEST)

    if a_pitch > a_roll:
        if a_pitch > almost_zero_deg_tolerance:
            if pitch > 0: # Nagnut nazad
                basic.show_arrow(ArrowNames.SOUTH)
                print("Nagnut nazad: "+a_pitch+"°")
            elif pitch < 0: # Nagnut naprijed
                basic.show_arrow(ArrowNames.NORTH)
                print("Nagnut naprijed: "+a_pitch+"°")
    else:
        if a_roll > almost_zero_deg_tolerance:
            if roll > 0: # Nagnut desno
                basic.show_arrow(ArrowNames.EAST)
                print("Nagnut desno: "+a_roll+"°")
            elif roll < 0: # Nagnut lijevo
                basic.show_arrow(ArrowNames.WEST)
                print("Nagnut lijevo: "+a_roll+"°")

basic.forever(on_forever)

def on_logo_down():
    pass
input.on_logo_down(on_logo_down)