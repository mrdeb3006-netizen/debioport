import cv2
import numpy as np

# Let's design the precise, beautiful, calligraphically accurate bezier paths for DEBENDRA:
# Dimensions: 800 x 480 viewBox

# 1. Capital Cursive 'D':
# - Starts at top-left of the D loop at (240, 190)
# - Sweeps down-left into the wide rounded bowl (160, 270) -> (170, 370) -> (240, 390)
# - Curves up the right side (320, 310) -> (330, 200) -> (270, 140)
# - Loops inside the top crown (220, 160) -> (240, 190)
d_bowl_path = "M 240 190 C 170 240 140 320 170 375 C 205 405 275 390 320 320 C 350 250 345 170 295 135 C 255 110 220 140 240 190"

# 2. Diagonal slash through D & continuous cursive letters: "e - b - e - n - d - r - a" + flourish:
# - Slash starts bottom-left (50, 420)
# - Cuts up through center of D (180, 340) -> (280, 275) -> (340, 230)
# - Letter 'e': loop up (360, 205) -> (372, 195) -> (365, 218)
# - Letter 'b': tall ascender loop (385, 175) -> (400, 110) -> (408, 105) -> (398, 165) -> (415, 205) -> (425, 195)
# - Letter 'e': loop (438, 180) -> (448, 170) -> (442, 192)
# - Letter 'n': twin downstrokes (458, 165) -> (462, 185) -> (472, 155) -> (478, 178)
# - Letter 'd': oval bowl + tall ascender loop (492, 165) -> (485, 180) -> (500, 182) -> (518, 60) -> (525, 50) -> (518, 110) -> (525, 170)
# - Letter 'r': cursive shoulder (538, 155) -> (550, 148) -> (555, 165)
# - Letter 'a': oval + tail (570, 145) -> (562, 165) -> (575, 168) -> (585, 145)
# - Upward sweeping tail flourish (605, 125) -> (660, 85) -> (720, 50)
debendra_word_path = (
    "M 50 420 C 140 365 240 295 340 230 "
    "C 355 210 372 195 365 218 "  # e
    "C 385 175 402 105 408 105 C 400 155 415 205 425 195 "  # b
    "C 438 180 448 170 442 192 "  # e
    "C 458 165 462 185 472 155 C 475 165 478 178 488 170 "  # n
    "C 485 182 498 185 510 160 C 518 70 525 50 525 50 C 518 100 522 155 530 170 "  # d
    "C 540 155 552 148 556 165 "  # r
    "C 562 150 562 168 575 168 C 585 145 635 105 725 48"  # a + tail flourish
)

# 3. Two Accent Dots
dot1_path = "M 744 42 L 746 44"
dot2_path = "M 764 30 L 766 32"

# 4. Underline beneath "ebendra" with flourish dot
underline_path = "M 320 355 C 420 290 500 235 550 200"
underline_dot = "M 578 184 L 580 186"

print("All stroke paths generated successfully.")
