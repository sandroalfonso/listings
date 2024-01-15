document.addEventListener("DOMContentLoaded", function(){
    

    const apiURL = "https://api.mtlmrtb.com/bids/v1/get-bids";
    const proxyURL = "https://cors-anywhere.herokuapp.com/";


    const requestData = {
        api_key: "S2Wb7copHTe3fRgcDLVOmKsuesmFb88jSo7z33dK",
        campaign: "a998ed",
        user_interaction: "post",
        vertical: "Personalloan",
        visitor_id: "CDFGH",
        publisher_id: "AHFGF",
        publisher: "LL Name ABC",
        source: "LL Live Feed",
        device: "Mobile",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML)",
        user_ip: "111.121.1.1",
        loan_purpose: "Personal",
        cash_out_amount: "5000",
        annual_income: "100000",
        employment_status: "Employed",
        debt_amount: "7500",
        person: [
            {
                first_name: "Rex",
                last_name: "LL",
                email: "rex@lift",
                gender: "male",
                marital_status: "single",
                phone: "55555555",
                dob: "06-20-1947",
                credit_rating: "excellent",
                military: false,
                residence: {
                    address: {
                        address: "123 Test Road",
                        city: "Beverly Hills",
                        state: "CA",
                        zipcode: "90210"
                    }
                }
            }
        ]
    };
    const url = `${proxyURL}${apiURL}?em=${requestData.person[0].email}&fn=${requestData.person[0].first_name}&ln=${requestData.person[0].last_name}&ph=${requestData.person[0].phone}&s1=247lg&s2=${requestData.source}&st=${requestData.person[0].residence.address.state}&zp=${requestData.person[0].residence.address.zipcode}&p=2`;
    // const url = `${apiURL}?em=${requestData.person[0].email}&fn=${requestData.person[0].first_name}&ln=${requestData.person[0].last_name}&ph=${requestData.person[0].phone}&s1=247lg&s2=${requestData.source}&st=${requestData.person[0].residence.address.state}&zp=${requestData.person[0].residence.address.zipcode}&p=2`;
    const loadingPage = document.querySelector("#loading-page");
    const mainPage = document.querySelector("#main-page");
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const fnameElement = document.getElementById("fname");
          fnameElement.textContent = requestData.person[0].first_name;
          loadingPage.style.display = "none";
          mainPage.style.display = "block";
          data.bids.forEach((listingData, index) => {
              const section = createListingSection(listingData, index);
              document.getElementById("my-listings").appendChild(section);
          });
      })
        .catch(error => {
            console.error(error);
        });


        function createListingSection(listingData, index) {
            const section = document.createElement("section");
            section.classList.add("listing-section");
        
            section.innerHTML = `
              <div class="listing-container">
                <div class="listing-left">
                  <img src="${listingData.logo}" alt="Listing Image" class="listing-logo">
                </div>
        
                <div class="listing-info">
                  <div class="company-name" id="listing-company-${index}">
                    ${listingData.brandname}
                  </div>
                  <div class="company-description" id="listing-description-${index}">
                    ${listingData.content}
                  </div>
                </div>
        
                <div class="buttons">
                  <div class="quote-button" id="quote-button-${index}" data-url="${listingData.actions[0].url}">
                    <div class="button-text">View My Quote</div>
                  </div>
                  <div class="compare-rates-button">
                    <div class="button-text">COMPARE RATES</div>
                  </div>
                </div>
              </div>
            `;

            const quoteButton = section.querySelector(`#quote-button-${index}`);
            quoteButton.addEventListener("click", () => {
                const buttonurl = quoteButton.getAttribute("data-url");
                if (buttonurl) {
                    window.open(buttonurl, "_blank");
                }
            });
        
            return section;
          }
    
});

