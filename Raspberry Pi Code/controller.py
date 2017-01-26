
import time, requests, os, pigpio, math

def cls():
    os.system(['clear','cls'][os.name == 'nt'])

pi = pigpio.pi()

DEBUG = 1

RED = 17
GREEN = 27
BLUE = 24

ZERO = 0

#response = requests.get("https://192.168.1.43/test1.php", verify=True, cert=["/etc/nginx/ssl/nginx.crt"])
response = requests.get("https://10.0.0.43/test1.php", verify=False)

while response.text != 'exit':
#    response = requests.get('https://192.168.1.43/test1.php')
    response = requests.get("https://10.0.0.43/test1.php", verify=False)

    settings = response.text
    print (settings)
    print (settings[1])
    cls()

    if response.text == 'exit':
        print (settings)

    INTENSITY = settings[0] + settings[1] + settings[2]
    FADE = settings[3]

    if FADE == '1':
        RED_INTENSITY = 255
        GREEN_INTENSITY = 0
        BLUE_INTENSITY = 0


    RED_TO_GREEN = 1
    GREEN_TO_BLUE = 0
    BLUE_TO_RED = 0

    while FADE == '1':
        print("Red: "), RED_INTENSITY
        print("Green: "), GREEN_INTENSITY
        print("Blue: "), BLUE_INTENSITY
        print("RED_TO_GREEN: "), RED_TO_GREEN
        cls()
        pi.set_PWM_dutycycle(RED, RED_INTENSITY)
        pi.set_PWM_dutycycle(GREEN, GREEN_INTENSITY)
        pi.set_PWM_dutycycle(BLUE, BLUE_INTENSITY)

        if RED_TO_GREEN == 1:
                RED_INTENSITY = RED_INTENSITY - 1
                GREEN_INTENSITY = GREEN_INTENSITY + 1
                BLUE_INTENSITY = 0
                if RED_INTENSITY <= 0:
                        RED_TO_GREEN = 0
                        GREEN_TO_BLUE = 1

        if GREEN_TO_BLUE == 1:
                RED_INTENSITY = 0
                GREEN_INTENSITY = GREEN_INTENSITY -1
                BLUE_INTENSITY = BLUE_INTENSITY + 1
                if GREEN_INTENSITY <= 0:
                        GREEN_TO_BLUE = 0
                        BLUE_TO_RED = 1

        if BLUE_TO_RED == 1:
                RED_INTENSITY = RED_INTENSITY + 1
                GREEN_INTENSITY = 0
                BLUE_INTENSITY = BLUE_INTENSITY -1
                if BLUE_INTENSITY <= 0:
                        BLUE_TO_RED = 0
                        RED_TO_GREEN =1

        time.sleep(0.1)

#       response = requests.get('https://192.168.1.43/test1.php')
        response = requests.get("https://10.0.0.43.43/test1.php", verify=False)

        settings = response.text
        FADE = settings[3]

    print settings[3]
    print settings[4]
    if settings[4] == '0': #RED
        pi.set_PWM_dutycycle(RED, INTENSITY)
        pi.set_PWM_dutycycle(GREEN, ZERO)
        pi.set_PWM_dutycycle(BLUE, ZERO)

    if  settings[4] == '1': #GREEN
        pi.set_PWM_dutycycle(RED, ZERO)
        pi.set_PWM_dutycycle(GREEN, INTENSITY)
        pi.set_PWM_dutycycle(BLUE, ZERO)

    if  settings[4] == '2': #BLUE
        pi.set_PWM_dutycycle(RED, ZERO)
        pi.set_PWM_dutycycle(GREEN, ZERO)
        pi.set_PWM_dutycycle(BLUE, INTENSITY)

    if  settings[4] == '3': #CYAN
        pi.set_PWM_dutycycle(RED, ZERO)
        pi.set_PWM_dutycycle(GREEN, INTENSITY)
        pi.set_PWM_dutycycle(BLUE, INTENSITY)

    if  settings[4] == '4': #PURPLE
        pi.set_PWM_dutycycle(RED, INTENSITY)
        pi.set_PWM_dutycycle(GREEN, ZERO)
        pi.set_PWM_dutycycle(BLUE, INTENSITY)

    if  settings[4] == '5': #YELLOW
        pi.set_PWM_dutycycle(RED, INTENSITY)
        pi.set_PWM_dutycycle(GREEN, math.floor(int(INTENSITY)/2))
        pi.set_PWM_dutycycle(BLUE, ZERO)

    if  settings[4] == '6': #ORANGE
        pi.set_PWM_dutycycle(RED, INTENSITY)
        pi.set_PWM_dutycycle(GREEN, math.floor(int(INTENSITY)/8))
        pi.set_PWM_dutycycle(BLUE, ZERO)

    if  settings[4] == '7': #WHITE
        pi.set_PWM_dutycycle(RED, INTENSITY)
        pi.set_PWM_dutycycle(GREEN, INTENSITY)
        pi.set_PWM_dutycycle(BLUE, INTENSITY)

    if  settings[4] == '8': #BLACK
        pi.set_PWM_dutycycle(RED, INTENSITY)
        pi.set_PWM_dutycycle(GREEN, INTENSITY)
        pi.set_PWM_dutycycle(BLUE, INTENSITY)

    if settings[4] == '9': #aqua
        pi.set_PWM_dutycycle(RED, ZERO)
        pi.set_PWM_dutycycle(GREEN, math.floor(int(INTENSITY)/4))
        pi.set_PWM_dutycycle(BLUE, INTENSITY)

    time.sleep(0.25)
