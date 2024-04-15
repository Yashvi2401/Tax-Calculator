document.addEventListener("DOMContentLoaded", function() {

    var storedValues = {};

    function storeFormValues() {
        storedValues.gross_annual_income = document.getElementById("gross_annual_income").value;
        storedValues.extra_income = document.getElementById("extra_income").value;
        storedValues.age_group = document.getElementById("age_group").value;
        storedValues.deduction = document.getElementById("deduction").value;
    }

    function populateFormFields() {
        document.getElementById("gross_annual_income").value = storedValues.gross_annual_income || "";
        document.getElementById("extra_income").value = storedValues.extra_income || "";
        document.getElementById("age_group").value = storedValues.age_group || "";
        document.getElementById("deduction").value = storedValues.deduction || "";

        document.querySelector('.error_icon1').style.display = 'none';
        document.querySelector('.error_icon2').style.display = 'none';
        document.querySelector('.error_icon3').style.display = 'none';
        document.querySelector('.error_icon4').style.display = 'none';
    }



    document.getElementById("submit").addEventListener("click", function (event) {
        event.preventDefault(); 


        storeFormValues();        

        var totalAnnualIncomeInput = document.getElementById("gross_annual_income").value;
        var extraIncomeInput = document.getElementById("extra_income").value || 0;
        var deductionInput = document.getElementById("deduction").value || 0;
        var ageGroup = document.getElementById("age_group").value;
    
        var numberRegex = /^\d*\.?\d+$/;
        var error1=false;
        var error2=false;
        var error3=false
        var error4= false;
     
    
        if (!numberRegex.test(totalAnnualIncomeInput)) {
            error1 = true;
            document.querySelector('.error_icon1').style.display = 'inline-block';
        }
    
        if (!numberRegex.test(extraIncomeInput)) {
            error2 = true;
            document.querySelector('.error_icon2').style.display = 'inline-block';
        }
    
        if(ageGroup=="")
        {
            error3=true
            document.querySelector('.error_icon3').style.display = 'inline-block';   
        }
    
        if (!numberRegex.test(deductionInput)) {
            error4 = true;
            document.querySelector('.error_icon4').style.display = 'inline-block';
        }
    
        if (!error1) {
            document.querySelector('.error_icon1').style.display = 'none';
        }
    
        if (!error2) {
            document.querySelector('.error_icon2').style.display = 'none';
        }
    
        if (!error3) {
            document.querySelector('.error_icon3').style.display = 'none';
        }
    
        if (!error4) {
            document.querySelector('.error_icon4').style.display = 'none';
        }
    
        
    
        if (error1 || error2 || error3|| error4) {
            return;
        }
    
        
    
    
        var totalAnnualIncome = parseFloat(totalAnnualIncomeInput);
        var extraIncome = parseFloat(extraIncomeInput);
        var deduction = parseFloat(deductionInput);
    
        
        var tax=0;
        
        var total = totalAnnualIncome + extraIncome - deduction;
        var totalIncome;
        if(total > 800000)
        {
            if(ageGroup=="lt40")
            {
                tax=.3*(total-800000) 
                totalIncome=total-tax
            }
    
            else if(ageGroup=="bt40&60")
            {
                tax=.4*(total-800000)
                totalIncome=total-tax
            }
    
            else if(ageGroup=="al60")
            {
                tax=.2*(total-800000)
                totalIncome=total-tax
            }
        }
    
    
        var modal = document.getElementById("modal");
        modal.style.display = "block";
    
    
        var closeBtn = document.getElementsByClassName("close")[0];
        closeBtn.onclick = function() {
            modal.style.display = "none";
            
       }
    
       if(total>800000)
       {
        document.getElementById("displayIncome").textContent = "Your overall income will be"
       document.getElementById("displayIncome2").textContent = totalIncome
       document.getElementById("displayIncome3").textContent = "After tax deduction"
    }
    else{
    
        document.getElementById("displayIncome").textContent = "Your overall income will be"
       document.getElementById("displayIncome2").textContent = total
       document.getElementById("displayIncome3").textContent = "No tax Added"
    
    }
    
       
       
    
    
       document.getElementById("form").reset();
    
    
        console.log("Total Annual Income:", totalAnnualIncome);
        console.log("Extra income:", extraIncome);
        console.log("Deduction:", deduction);
        console.log("Age Group:", ageGroup);
        console.log("Total:", total);
        console.log("Total tax:",tax)
        console.log("totalIncome:",totalIncome)
    });


    document.getElementById("reset").addEventListener("click", function (event) {
        event.preventDefault(); 
    
        document.getElementById("gross_annual_income").value = "";
    document.getElementById("extra_income").value = "";
    document.getElementById("age_group").selectedIndex = 0; // Reset the selected index to the default
    document.getElementById("deduction").value = "";

    document.querySelector('.error_icon1').style.display = 'none';
    document.querySelector('.error_icon2').style.display = 'none';
    document.querySelector('.error_icon3').style.display = 'none';
    document.querySelector('.error_icon4').style.display = 'none';

    });

    document.getElementById("edit").addEventListener("click", function (event) {
        event.preventDefault(); 

        // Populate form fields with stored values
        populateFormFields();

        // Hide the modal or perform any other actions after editing
        var modal = document.getElementById("modal");
        modal.style.display = "none";
    });
    


})