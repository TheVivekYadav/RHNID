export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "POST") {
        const { rhnid, email } = req.body;

        const googleAppsScriptUrl = process.env.URL;

        const response = await fetch(googleAppsScriptUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rhnid, email }),
        });

        res.status(200).json({ message: "Data sent to Google Sheets!" });
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}

