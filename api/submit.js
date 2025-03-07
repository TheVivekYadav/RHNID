export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method === "POST") {
        const { rhnid, fullname, email, phoneno, course} = req.body;
        const googleAppsScriptUrl = process.env.URL;

        if (!googleAppsScriptUrl) {
            return res.status(500).json({ error: "Google Apps Script URL is missing in environment variables." });
        }

        try {
            console.log("Forwarding data to Google Apps Script:", { rhnid, fullname, email, phoneno, course });

            const response = await fetch(googleAppsScriptUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rhnid, fullname, email, phoneno, course }),
            });

            const data = await response.text(); // Log the actual response

            console.log("Google Apps Script Response:", data);
            return res.status(200).json({ message: "Data sent to Google Sheets!", response: data });

        } catch (error) {
            console.error("Error forwarding data to Google Apps Script:", error);
            return res.status(500).json({ error: "Failed to send data.", details: error.message });
        }
    } else {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
}

