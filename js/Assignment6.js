function MenuSelection()
{
    if (document.getElementById("menu").value == "Add a Customer")
    {
        document.getElementById("addcust").style.visibility = "visible";
        document.getElementById("changeship").style.visibility = "hidden";
        document.getElementById("delcust").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Change Shipping Address")
    {
        document.getElementById("addcust").style.visibility = "hidden";
        document.getElementById("changeship").style.visibility = "visible";
        document.getElementById("delcust").style.visibility = "hidden";
    }
    else
    {
        document.getElementById("addcust").style.visibility = "hidden";
        document.getElementById("changeship").style.visibility = "hidden";
        document.getElementById("delcust").style.visibility = "visible";       
    }
}

function CreateCustomer()
{
    var addprompt = confirm("Are you sure you want to add this customer?");
    if (addprompt == true)
    {
        
        //create URL and query string
        var custRequest = new XMLHttpRequest();
        var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
        
        //get inputted customer information
        var customerid = document.getElementById("custid").value;
        var customername = document.getElementById("custname").value;
        var customercity = document.getElementById("custcity").value;
        
        //create new customer variable in service format
        var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName":"' + customername + '","City":"' + customercity + '"}';
        
        //loop to get response object
        custRequest.onreadystatechange = function()
        {
            if (custRequest.readyState == 4 && custRequest.status == 200)
            {
                var result = JSON.parse(custRequest.responseText);
                CustResult(result);
            }
        }
        
        custRequest.open("POST",url,true);
        custRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        custRequest.send(newcustomer);
    }
    else
    {
        return;
    }
}

function CustResult(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("result").innerHTML = "The operation was successful.";
    }
    else
    {
        document.getElementById("result").innerHTML = "The operation failed." + "<br><br>" + output.Exception;
    }
}

function ChangeShipping()
{
    var shipprompt = confirm("Are you sure you want to change this shipping address?");
    if (shipprompt == true)
    {
        //create URL and query string
        var shipRequest = new XMLHttpRequest();
        var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
        
        //get inputted updated customer info
        var corder = document.getElementById("csorder").value;
        var caddress = document.getElementById("csaddress").value;
        var ccity = document.getElementById("cscity").value;
        var cname = document.getElementById("csname").value;
        var czip = document.getElementById("cszip").value;
        
        //pass updated customer info to service
        var changeship = '{"OrderID":"' + corder + '","ShipAddress":"' + caddress + '","ShipCity":"' + ccity + '","ShipName":"' + cname + '","ShipPostcode":"' + czip + '"}';
        
        //loop to get response object
        shipRequest.onreadystatechange = function()
        {
            if (shipRequest.readyState == 4 && shipRequest.status == 200)
            {
                var shipresult = JSON.parse(shipRequest.responseText);
                ShipResult(shipresult);
            }
        }
        
        shipRequest.open("POST",url,true);
        shipRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        shipRequest.send(changeship);    
    }
    else
    {
        return;    
    }
}

function ShipResult(display)
{
    if (display == 1)
    {
        document.getElementById("shipoutput").innerHTML = "The shipping information has been changed for order " + document.getElementById("csorder").value;
    }
    else if (display == 0)
    {
        document.getElementById("shipoutput").innerHTML = "The operation failed due to an unspecified error." + "<br><br>" + display.Exception;
    }
    else if (display == -2)
    {
        document.getElementById("shipoutput").innerHTML = "Error in input information." + "<br><br>" + display.Exception;
    }
    else if (display == -3)
    {
        document.getElementById("shipoutput").innerHTML = "That order number does not exist.";
    }
}

function DeleteCustomer()
{
    var delprompt = confirm("Are you sure you want to delete this customer?");
    if (delprompt == true)
    {
        
        //create URL and query string
        var delRequest = new XMLHttpRequest();
        var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
        url += document.getElementById("delid").value;
        
        //loop to get response object
        delRequest.onreadystatechange = function()
        {
            if (delRequest.readyState == 4 && delRequest.status == 200)
            {
                var delresult = JSON.parse(delRequest.responseText);
                DelResult(delresult);
            }
        }
        
        delRequest.open("GET",url,true);
        delRequest.send();
    }
    else
    {
        return;
    }
}

function DelResult(show)
{
    if (show.DeleteCustomerResult.WasSuccessful == 1)
    {
        document.getElementById("deloutput").innerHTML = "The operation was successful.";
    }
    else
    {
        document.getElementById("deloutput").innerHTML = "The operation failed." + "<br><br>" + show.Exception;
    }
}