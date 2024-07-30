<!-- ABOUT THE PROJECT -->
## CSARCH2-Simulation-Project---IEEE-754-Decimal-32-Floating-Point-Converter

The **IEEE-754-Decimal-32-Floating-Point-Converter** is a website designed to convert any decimal to a Decimal 32 floating point. This will also show different processes before coming up with a final answer. Below are some sample inputs from the website.

## Developers
* Arca, Althea Denisse<br>
* Del Castillo, Jose Mari<br>
* Fulo, Rulet<br>
* Lim, Alyanna<br>

<!-- GETTING STARTED -->
## How to Use
1. Input any decimal number and the exponent.
2. Click Convert.

![how to use](https://github.com/user-attachments/assets/7cef6c05-6f2a-490b-bf40-a674edffd344)
   
If the decimal number input contains more than 7 digits, the user may have the option to truncate, round up, round down, and round to the nearest ties to even. To do this, do the following:
1. After clicking the convert button, click on the dropdown menu beside the input and choose any options.
2. Click the Convert button again to get the result.

![roundingoptions](https://github.com/user-attachments/assets/62b328a4-c430-4b40-865a-8aafda7a58de)

Exporting Results:
1. Click the Export button below the results.
2. The result (in a txt format) will automatically download.

   
### Input

1. **Input a 3 digit number** <br>
      Input: 457<br>
      Exponent: 2<br>
   <br>
   ![3digitdecimal](https://github.com/user-attachments/assets/9ac5b182-c851-44a9-adc8-c231c167cc4f)
   ***
   
2. **Input with a decimal point** <br>
      Input: 468.23<br>
      Exponent: 4<br>
   <br>
   ![withdecimalpoint](https://github.com/user-attachments/assets/b68d929b-0bc1-4a34-a184-c88fc54d6367)
   ***
   
3. **Input more than 7 digits to test the Truncate option** <br>
      Input: 967587036 (Truncate)<br>
      Exponent: 5<br>
   <br>
   ![9digittruncate](https://github.com/user-attachments/assets/9a5577fa-04fb-4813-9289-5004e8ee1a9e)
   ***
   
4. **Input a negative number with Round Down option** <br>
      Input: -102478597 (Round Down)<br>
      Exponent: 4<br>
   <br>
   ![negativenumandrounddown](https://github.com/user-attachments/assets/31ce94ef-00ed-4271-b366-27f7ca608988)
   ***
   
5. **Input a square root number with Round to Nearest Ties to Even option** <br>
      Input: sqrt(255) (Round to Nearest Ties to Even)<br>
      Exponent: 6<br>
   <br>
   ![sqrtwithroundtoNTE](https://github.com/user-attachments/assets/821be649-a6e0-4357-988c-79f8f4928497)
   ***
   
6. **Input a fraction with the Round Up option** <br>
      Input: 5/45 (Round Up)<br>
      Exponent: 3<br>
   <br>
   ![fractionwithroundup](https://github.com/user-attachments/assets/8d17abd3-8220-4216-827a-e0990a8d0a37)
   ***
   
7. **Input with addition** <br> 
      Input: 749 + 5<br>
      Exponent: 6<br>
   <br>
   ![addition](https://github.com/user-attachments/assets/68486705-790e-4c67-b051-0400085f7385)
   ***
   
8. **Input with addition and letter to test NaN values** <br>
       Input: 45 + r<br>
       Exponent: 8<br>
   <br>
   ![specialcaseNaNwithletter](https://github.com/user-attachments/assets/77c572fa-b057-4665-a98a-385b72b3680c)
   ***
   
9. **Input letters to test NaN values** <br>
      Input: ab<br>
      Exponent: 6<br>
   <br>
   ![letter](https://github.com/user-attachments/assets/2ad6b52c-33e7-464e-98dc-df2eed299051)
   ***

10. **Input with subtraction** <br>
         Input: 43 - 3<br>
         Exponent: 4<br>
      <br>
      ![subtraction](https://github.com/user-attachments/assets/6ce50386-7e0d-4c70-b7a6-477e5b31c415)
      ***

11. **Input with multiplication** <br>
         Input: 40 * 10 <br>
         Exponent: 2<br>
      <br>
      ![multiply](https://github.com/user-attachments/assets/dac1d374-79b9-441a-824e-000b6f01e8b0)
      ***

12. **Input with greater than 90 exponent** <br>
         Input: 893495409 (Round Up)<br>
         Exponent: 121<br>
      <br>
      ![greaterthan90exp](https://github.com/user-attachments/assets/4ac7ab9e-3c18-4971-ac8a-a6ea3d6c9d61)
      ***

13. **Input with negative exponent** <br>
         Input: 14567565665 (Truncate)<br>
         Exponent: -10<br>
      <br>
      ![negativeexp](https://github.com/user-attachments/assets/4c66430c-0ae9-4adf-aace-56fffcc360b6)
      ***

14. **Input with less than -101 exponent** <br>
         Input: 3457<br>
         Exponent: -200<br>
      <br>
      ![denormalized](https://github.com/user-attachments/assets/b0ea329a-d0a5-48bf-b73d-91a0e0042db8)
      ***

15. **Input with a Round up option** <br>
         Input: 3456673.554353<br>
         Exponent: 3<br>
      <br>
      ![15  Input with a Round up option](https://github.com/user-attachments/assets/925a0d73-0877-422f-aa41-ff48a5aa2aee)
      ***

15.1. **Negative input with a round up option** <br>
         Input: -3456673.554353<br>
         Exponent: 3<br>
      <br>
      ![15 1 Negative input with a round up option](https://github.com/user-attachments/assets/d8b5e4e3-e3c4-42da-a9dd-71117e7cabce)
      ***
      
16. **Another input with a Round up option** <br>
         Input: 34566730<br>
         Exponent: 3<br>
      <br>
      ![16  Another input with a Round up option ](https://github.com/user-attachments/assets/23d3adef-bf73-4e3c-af1f-df42265a012f)
      ***

17. **Input with a Round down option** <br>
         Input: 2176459.9<br>
         Exponent: 5<br>
      <br>
      ![17  Input with a Round down option](https://github.com/user-attachments/assets/a382090b-19fc-4f1b-be2f-8bc743ba4a96)
      ***
    
17.1. **Negative input with a round down option** <br>
         Input: -2176459.9<br>
         Exponent: 5<br>
      <br>
      ![17 1 Negative input with a round down option](https://github.com/user-attachments/assets/cff62f80-2aef-4370-9e8c-d02352767d0e)
      ***

18. **Input with a Round to nearest ties to even** <br>
         Input: 7545594.4<br>
         Exponent: 8<br>
      <br>
      ![18  Input with a Round to nearest ties to even](https://github.com/user-attachments/assets/feed730e-0862-46e9-95e6-27f2e446e706)
      ***
    
18.1. **Negative input with a round to nearest ties to even** <br>
         Input: -7545594.4<br>
         Exponent: 8<br>
      <br>
      ![18 1 Negative input with a round to nearest ties to even](https://github.com/user-attachments/assets/346ead26-34d0-4c0a-9a6a-4e9c47b067fa)
      ***

19. **Another input with a round to nearest ties to even** <br>
         Input: 1245594.87<br>
         Exponent: 9<br>
      <br>
      ![19  Another input with a round to nearest ties to even](https://github.com/user-attachments/assets/ba4ce74f-1360-48b8-b65a-008e1c691daa)
      ***
    
19.1. **Another negative input with a round to nearest ties to even** <br>
         Input: -1245594.13342<br>
         Exponent: 9<br>
      <br>
      ![19 1 Another negative input with a round to nearest ties to even](https://github.com/user-attachments/assets/3a47dbbf-1896-4332-88cc-ef318a732df5)
      ***
