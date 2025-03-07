export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method === "POST") {
        const { rhnid, email } = req.body;
        const googleAppsScriptUrl = process.env.URL;

        if (!googleAppsScriptUrl) {
            return res.status(500).json({ error: "Google Apps Script URL is missing in environment variables." });
        }

        try {
            const response = await fetch(googleAppsScriptUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rhnid, email }),
            });

            const data = await response.json();
            return res.status(200).json({ message: "Data sent to Google Sheets!", response: data });

        } catch (error) {
            console.error("Error forwarding data:", error);
            return res.status(500).json({ error: "Failed to send data." });
        }
    } else {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
}

