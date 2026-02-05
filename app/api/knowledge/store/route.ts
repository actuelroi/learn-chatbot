import { isAuthorized } from "@/lib/isAuthorized";
import { summarizeMarkdown } from "@/lib/openAi";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {

    try {
        const user = await isAuthorized();


        if (!user) {
            return NextResponse.json({
                error: "Unauthorized"
            }, { status: 401 }
            )
        }
        const contentType = req.headers.get('content-type') || ""

        let type: string;
        let body: any = []

        if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();

            type = formData.get('type') as string;

            if (type === "upload") {
                const file = formData.get("file") as File;
                if (!file) {
                    return NextResponse.json(
                        { error: "No file provided" },
                        { status: 400 }
                    )
                }

                const fileContent = await file.text();

                const lines = fileContent.split('\n').filter((line)=> line.trim());
                const headers = lines[0]?.split(",").map((h)=> h.trim());

                let formattedContent :any= "";

                const markdown = await summarizeMarkdown(fileContent)
                formattedContent = markdown
            }else{
                body = await req.json();
                type = body.type;
                
            }

            if(type === "website"){
                const zenUrl=  new URL("https//api.zenrows.com/v1/")

                zenUrl.searchParams.set("apikey", process.env.ZENROWS_API_KEY!)
                zenUrl.searchParams.set('url', body.url);
                zenUrl.searchParams.set('response_type', "markdown");

                //const res = await fetch()
            }
        }

    } catch (error) {

    }

}