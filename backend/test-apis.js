async function testAll() {
    console.log("Starting End-to-End Test...");
    
    // 1. Volunteer GET
    try {
        const res = await fetch('http://localhost:5000/api/volunteers');
        const data = await res.json();
        console.log("GET /volunteers SUCCESS:", data.length, "volunteers found.");
    } catch(e) {
        console.error("GET /volunteers FAILED:", e.message);
    }
    
    // 2. Volunteer POST
    try {
        const payload = {
            name: "Audit Test",
            email: "audit@test.com",
            phone: "9999999999",
            skills: "Testing",
            interests: "Auditing",
            availability: "weekends"
        };
        const res = await fetch('http://localhost:5000/api/volunteers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        console.log("POST /volunteers SUCCESS:", data.message);
    } catch(e) {
        console.error("POST /volunteers FAILED:", e.message);
    }

    // 3. AI Chat POST
    try {
        const res = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "What is NayePankh?" })
        });
        const data = await res.json();
        console.log("POST /chat SUCCESS:", data.reply || data);
    } catch(e) {
        console.error("POST /chat FAILED:", e.message);
    }
}

testAll();
