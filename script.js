// --- Security Check Start ---
(function() {
    const authorizedDomain = "ahmad-qx-bot.vercel.app";
    const currentHost = window.location.hostname;
 
    // Agar domain match nahi karta toh /error par bhej do
    if (currentHost !== authorizedDomain) {
        window.location.href = window.location.origin + "/error";
    }
})();
// --- Security Check End ---
(function() {
/* ------------------ 3. AUTH CHECK (NEW VERCEL API) ------------------ */
    // Ahmad Bhai ki nayi specialized API
    var authAPI = "https://ahmad-qx-bot.vercel.app/b?id=";
    const logoURL = "https://feiugum-codes.netlify.app/imgs/qx.svg";
    
    // =================== 2. UID LOGIC ===================
    let myUID = localStorage.getItem('ahmad_script_uid');
    if (!myUID) {
        myUID = Array.from({length: 20}, () => Math.floor(Math.random() * 10)).join('');
        localStorage.setItem('ahmad_script_uid', myUID);
    }

    // =================== 3. VERIFICATION & DIRECT OPEN ===================
fetch(authAPI + myUID)
        .then(r => r.json())
        .then(res => {
            // Agar API true bolti hai toh seedha main script chalao
            if (res && res.authorized === true) {
                executeMainScript();
            } else {
                // Agar register nahi hai toh lock screen dikhao
                showLockUI();
            }
        })
        .catch(() => {
            alert("Server connection failed!");
        });

    // =================== 4. LOCK UI (WHITE BOX) ===================
    function showLockUI() {
        const overlay = document.createElement('div');
        overlay.id = "ahmad-lock-screen";
        Object.assign(overlay.style, {
            position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
            background: '#0e121a', zIndex: '2147483647', display: 'flex', 
            justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif'
        });

        overlay.innerHTML = `
            <div style="background: white; width: 320px; padding: 35px; border-radius: 25px; text-align: center; box-shadow: 0 15px 40px rgba(0,0,0,0.5);">
                <img src="${logoURL}" style="width: 80px; margin-bottom: 15px;">
                <div style="color: #222; font-size: 24px; font-weight: 900; letter-spacing: 1px; margin-bottom: 5px;">LOCKED</div>
                <div style="color: crimson; font-size: 13px; margin-bottom: 20px; font-weight: bold;">ID Not Registered</div>
                
                <div style="background: #f1f5f9; color: #334155; padding: 15px; border-radius: 12px; font-family: monospace; font-size: 16px; border: 1px dashed crimson; margin-bottom: 25px; word-break: break-all;">
                    ${myUID}
                </div>

                <div style="text-align: left; font-size: 14px; color: #444; line-height: 1.8; border-top: 1px solid #eee; padding-top: 15px;">
                    <b>Whatsapp:</b> <span style="color: #25d366;">+923316346879</span><br>
                    <b>Telegram:</b> <span style="color: #0088cc;">@Magic_Scripts</span><br>
                    <div style="margin-top: 12px; text-align: center; font-weight: bold; color: #222;">Made by @Magic_Scripts</div>
                </div>

                <button onclick="location.reload()" style="margin-top: 25px; width: 100%; background: crimson; color: white; border: none; padding: 14px; border-radius: 12px; font-weight: bold; cursor: pointer; font-size: 16px;">RETRY</button>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    // =================== 5. MAIN SCRIPT (Aapka Code) ===================
    function executeMainScript() {
        /* ---------------- LOADER ---------------- */
        var dia = document.querySelectorAll("dialog");
        if (dia.length) dia.forEach(d => d.remove());

        var styleElem = document.head.appendChild(document.createElement("style"));
        styleElem.innerHTML = `
        dialog::backdrop {background:#181a20}
        ::selection {background:crimson;color:white}
        `;

        var loader = document.createElement("dialog");
        document.body.appendChild(loader);
        loader.innerHTML = `<div>PLEASE WAIT...</div>`;
        loader.style = "border:none;outline:none;margin:auto;padding:1rem;background:#fff;";

        function showLoader(){
            loader.showModal();
            setTimeout(hideLoader, 1000);
        }
        function hideLoader(){
            if(loader.open) loader.close();
        }
        showLoader();

        /* --------- INITIALIZE UI --------- */
        const box = document.querySelector("#box");
        if(box) {
            box.style.display = "block";
            box.contentEditable = true;
        }

        let time = new Date().toLocaleTimeString("en", { timeStyle: "short" })
            .replace(/\s|AM|PM/g, "");

        // Aapke selectors ke mutabiq time update
        const timeEl = document.querySelector(".time");
        const sTimeEl = document.querySelector(".search__time");
        const rTimeEl = document.querySelector(".result__time");
        
        if(timeEl) timeEl.innerHTML = time;
        if(sTimeEl) sTimeEl.innerHTML = time;
        if(rTimeEl) rTimeEl.innerHTML = time;

        /* --------- SCREENSHOT BUTTON --------- */
        var btn = document.querySelector(".btn");
        btn?.addEventListener("click", () => {
            document.body.contentEditable = false;
            html2canvas(box).then(canvas => {
                let a = document.createElement("a");
                a.download = `SS-${Date.now()}.png`;
                a.href = canvas.toDataURL("image/png");
                a.click();
                document.body.contentEditable = true;
            });
        });

        /* --------- BATTERY CONTROL --------- */
        let input = document.querySelector("input");
        let battery = document.querySelector(".battery2");

        if(input && battery) {
            battery.style.width = `${Number(input.value) * 25 / 100}px`;
            input.oninput = () => {
                battery.style.width = `${Number(input.value) * 25 / 100}px`;
            };
        }

        console.log("Access Granted: Tool Running.");
    }
})();
