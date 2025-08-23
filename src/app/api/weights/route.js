import { NextResponse } from "next/server";
import { readWeights, addWeight, deleteWeight } from "@/lib/fileService";

export async function GET() {
  try {
    const weights = readWeights();
    return NextResponse.json(weights);
  } catch (error) {
    console.error("API Error reading weights:", error);
    return NextResponse.json(
      { error: "Failed to read weights" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { date, value } = await request.json();

    if (!date || !value) {
      return NextResponse.json(
        { error: "Date and value are required" },
        { status: 400 }
      );
    }

    const success = addWeight(date, value);

    if (success) {
      return NextResponse.json({ message: "Weight added successfully" });
    } else {
      return NextResponse.json(
        { error: "Failed to add weight" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API Error adding weight:", error);
    return NextResponse.json(
      { error: "Failed to add weight" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { date } = await request.json();

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    const success = deleteWeight(date);

    if (success) {
      return NextResponse.json({ message: "Weight deleted successfully" });
    } else {
      return NextResponse.json(
        { error: "Failed to delete weight" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API Error deleting weight:", error);
    return NextResponse.json(
      { error: "Failed to delete weight" },
      { status: 500 }
    );
  }
}
