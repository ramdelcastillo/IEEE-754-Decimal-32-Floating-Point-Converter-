![image](https://github.com/user-attachments/assets/a32a3c1d-5bf6-4da6-93b3-0828c0980492)<!-- ABOUT THE PROJECT -->
## CSARCH2-Simulation-Project---IEEE-754-Decimal-32-Floating-Point-Converter

The **IEEE-754-Decimal-32-Floating-Point-Converter** is a website designed to convert any decimal input with exponent (Base-10) to an IEEE 754 Single Precision decimal (Decimal-32) format. This will also show processing done while converting the input to its respective output. Below is a manual on how to use the application with some sample inputs from the webpage.

## Developers
* Arca, Althea Denisse<br>
* Del Castillo, Jose Mari<br>
* Fulo, Rulet<br>
* Lim, Alyanna<br>

<!-- GETTING STARTED -->
## How to Use
1. Input any decimal number (can accept basic expressions such as 1/0, sqrt(4), x+10) and the exponent which must be a number only.
2. Click Convert.

![how to use](https://github.com/user-attachments/assets/7cef6c05-6f2a-490b-bf40-a674edffd344)
   
If the decimal number input contains more than 7 digits, the user will have the option to truncate, round up, round down, and round to the nearest ties to even. To do this, do the following:
1. After clicking the convert button, click on the dropdown menu beside the input and choose any options.
2. Click the Convert button again to get the result.

![roundingoptions](https://github.com/user-attachments/assets/62b328a4-c430-4b40-865a-8aafda7a58de)

Exporting Results:
1. Click the Export button below the results after converting.
2. The result of the conversion (in a text file named 'IEEE-754 Decimal-32 Output') will automatically download.


### Input

1. **Input with 3-digit number** <br>
      Input: 457<br>
      Exponent: 2<br>
   <br>
   ![3digitdecimal](https://github.com/user-attachments/assets/9ac5b182-c851-44a9-adc8-c231c167cc4f)
   ***
2. **Input with negative 5-digit number** <br>
      Input: -12345<br>
      Exponent: -5<br>
   <br>
  ![image](https://github.com/user-attachments/assets/f555bed5-d221-4045-a982-7de12a77e4b3)
   ***
3. **Input with a decimal point with less than 7 digits** <br>
      Input: 468.23<br>
      Exponent: -20<br>
   <br>
   ![image](https://github.com/user-attachments/assets/2f4c70bf-064a-4829-ae2b-022fead227dd)
   ***
4. **Input with a decimal point with less than 7 digits (negative decimal)** <br>
      Input: -3012.43<br>
      Exponent: 4<br>
   <br>
  ![image](https://github.com/user-attachments/assets/2d567977-50e7-495a-9d1e-dfae8dca9690)
   ***
5. **Input with more than 7 digits with Truncate option** <br>
      Input: 967587036 (Truncate)<br>
      Exponent: 5<br>
   <br>
   ![image](https://github.com/user-attachments/assets/4fc32014-1b83-43f5-914c-d12c2151e728)
   ***
6. **Input with more than 7 digits with Truncate option (negative decimal)** <br>
      Input: -823483243 (Truncate)<br>
      Exponent: 2<br>
   <br>
   ![image](https://github.com/user-attachments/assets/50cd91b9-7496-4072-8c95-b640190838fc)
   ***
7. **Input with a decimal point that has more than 7 digits with Truncate option** <br>
      Input: 8934.95409 (Truncate)<br>
      Exponent: -30<br>
   <br>
  ![image](https://github.com/user-attachments/assets/fabaea04-f2a4-4b1c-8c27-264972fdc590)
   ***
8. **Input with a decimal point that has more than 7 digits with Truncate option (negative decimal)** <br>
      Input: -434.15321 (Truncate)<br>
      Exponent: -12<br>
   <br>
![image](https://github.com/user-attachments/assets/3ebfd994-d958-4a4c-9860-038cb137b4ee)
***
9. **Input with more than 7 digits with Round Up option** <br>
      Input: 4674320131 (Round Up)<br>
      Exponent: 9<br>
   <br>
    ![image](https://github.com/user-attachments/assets/5afef646-e5ea-4ae5-90aa-26b9c3dd87e4)
 ***
 
10. **Input with more than 7 digits with Round Up option (negative decimal)** <br>
      Input: -24233227 (Round Up)<br>
      Exponent: -1<br>
   <br>
   
 ![image](https://github.com/user-attachments/assets/1d2e4b78-7d30-4f81-9a34-93c76d847d04)
 ***
 11. **Input with a decimal point that has more than 7 digits with Round Up option** <br>
      Input: 78.345345 (Round Up)<br>
      Exponent: -24<br>
   <br>
   
 ![image](https://github.com/user-attachments/assets/4fcf8f4b-214d-4f4b-9521-29a39b6c600c)
 ***
  12. **Input with a decimal point that has more than 7 digits with Round Up option (negative decimal)** <br>
      Input: -434523.45 (Round Up)<br>
      Exponent: -5<br>
   <br>
   
![image](https://github.com/user-attachments/assets/1bbb0731-86d8-4add-bee9-19e3f187adf1)
 ***
   13. **Input with more than 7 digits with Round Down option** <br>
      Input: 5673522231 (Round Down)<br>
      Exponent: 9<br>
   <br>
   
![image](https://github.com/user-attachments/assets/cbf897ca-806e-4256-ba04-2ff2027221ec)
 ***
   14. **Input with more than 7 digits with Round Down option (negative decimal)** <br>
      Input: -345324234 (Round Down)<br>
      Exponent: -9<br>
   <br>
   
![image](https://github.com/user-attachments/assets/aa26e7a3-dc01-476a-b9c1-b9a6550b7a94)
 *** 
   15. **Input with a decimal point that has more than 7 digits with Round Down option** <br>
      Input: 57689.03421 (Round Down)<br>
      Exponent: 10<br>
   <br>
   
![image](https://github.com/user-attachments/assets/72ab58d6-c70a-446b-add5-45d30b647e62)
 *** 

   17. **Input with a decimal point that has more than 7 digits with Round Down option (negative decimal)** <br>
      Input: -3.3222123123 (Round Down)<br>
      Exponent: -54<br>
   <br>
   
![image](https://github.com/user-attachments/assets/9d079067-cb27-41a2-baab-074bb1c37e53)
 *** 
   18. **Input with more than 7 digits with Round to Nearest Ties to Even option** <br>
      Input: 534654223 (RTNTTE)<br>
      Exponent: 12<br>
   <br>
   
![image](https://github.com/user-attachments/assets/b6c69328-a869-4573-bdd0-cebbdef58a9f)
 *** 
   19. **Input with more than 7 digits with Round to Nearest Ties to Even option (negative decimal)** <br>
      Input: -75344325 (RTNTTE)<br>
      Exponent: -11<br>
   <br>
   
![image](https://github.com/user-attachments/assets/72b6957a-a924-42a6-9749-ad9dc19c4597)
 *** 
   20. **Input with a decimal point that has more than 7 digits with Round to Nearest Ties to Even option** <br>
      Input: 7884565.5 (RTNTTE)<br>
      Exponent: 23<br>
   <br>
   
![image](https://github.com/user-attachments/assets/65aa03ec-5b04-4deb-b6e1-5fa5d72239ed)
 *** 
   21. **Input with a decimal point that has more than 7 digits with Round to Nearest Ties to Even option (negative decimal)** <br>
      Input: -1245.42123 (RTNTTE)<br>
      Exponent: -45<br>
   <br>
   
![image](https://github.com/user-attachments/assets/9200d6a3-3731-44e3-8844-d152d70b88c8)
 *** 
   22. **Input with more than 7 digits with Round Down option (negative decimal)** <br>
      Input: -345324234 (Round Down)<br>
      Exponent: -9<br>
   <br>
   
![image](https://github.com/user-attachments/assets/9200d6a3-3731-44e3-8844-d152d70b88c8)
 *** 
   23. **Input with more than 7 digits with Round Down option (negative decimal)** <br>
      Input: -345324234 (Round Down)<br>
      Exponent: -9<br>
   <br>
   
![image](https://github.com/user-attachments/assets/aa26e7a3-dc01-476a-b9c1-b9a6550b7a94)
 *** 
   24. **Input equates to final exponent greater than 90 (Special Case: Infinity)** <br>
      Input: 893495409 (Round Up)<br>
      Exponent: 89<br>
   <br>
   
![image](https://github.com/user-attachments/assets/322c5e79-e7b7-479c-9a88-fa88fa6a0130)
 *** 
   25. **Input equates to final exponent less than 101 (Special Case: Denormalized)** <br>
      Input: -6423.34523 (RTNTTE)<br>
      Exponent: -99<br>
   <br>

![image](https://github.com/user-attachments/assets/4d8093e2-e6fb-4323-a361-dab5756be910)
 *** 
   26. **Input equates to normalized decimal being NaN (Special Case: NaN)** <br>
      Input: sqrt(-1) <br>
      Exponent: -5<br>
   <br>
   
![image](https://github.com/user-attachments/assets/5ded3aee-125f-45c3-abda-f37ab385f913)
 *** 
   27. **Input equates to normalized decimal being NaN (Special Case: NaN)** <br>
      Input: 5/0 <br>
      Exponent: 45<br>
   <br>
   
![image](https://github.com/user-attachments/assets/8ac8c519-9762-42d6-8417-e1e76f52df7e)
 ***
   28. **Input equates to normalized decimal being NaN (Special Case: NaN)** <br>
      Input: 213<br>
      Exponent: a<br>
   <br>
   
![image](https://github.com/user-attachments/assets/404cfc67-cf6b-443b-b65a-02337e107c08)
 *** 
   29. **Expression Inputs 1** <br>
      Input: 5/2<br>
      Exponent: 5<br>
   <br>
   
![image](https://github.com/user-attachments/assets/55673b08-54c0-439b-a180-6e3d0e3d7bab)
 *** 

   30. **Expression Inputs 2** <br>
      Input: sqrt(255) (Round Down)<br>
      Exponent: 45<br>
   <br>
   
![image](https://github.com/user-attachments/assets/ecb36c08-446b-44e9-a666-5db85c7efdc4)
 *** 
   31. **Expression Inputs 3** <br>
      Input: (2*54)+1 <br>
      Exponent: 23<br>
   <br>
   
![image](https://github.com/user-attachments/assets/4bfd7a74-c55f-42dc-838c-bcdcab40a3da)
 *** 
   32. **Blank decimal input** <br>
      Input: <br>
      Exponent: 23<br>
   <br>
   
![image](https://github.com/user-attachments/assets/437465a1-0fc7-4cd4-b4a5-b2cabd650832)
 *** 
   33. **Blank exponent** <br>
      Input: 123<br>
      Exponent: <br>
   <br>
   
![image](https://github.com/user-attachments/assets/386f3445-ff7a-4653-b5dc-f3d57aabced7)
 *** 
   34. **Blank decimal and exponent input** <br>
      Input: <br>
      Exponent: <br>
   <br>
   
![image](https://github.com/user-attachments/assets/176b63ae-55c9-43a3-8d5a-70e956712830)
 *** 
   14. **Input with more than 7 digits with Round Down option (negative decimal)** <br>
      Input: -345324234 (Round Down)<br>
      Exponent: -9<br>
   <br>
   
![image](https://github.com/user-attachments/assets/aa26e7a3-dc01-476a-b9c1-b9a6550b7a94)
 *** 
   14. **Input with more than 7 digits with Round Down option (negative decimal)** <br>
      Input: -345324234 (Round Down)<br>
      Exponent: -9<br>
   <br>
   
![image](https://github.com/user-attachments/assets/aa26e7a3-dc01-476a-b9c1-b9a6550b7a94)
 *** 

 





