-- AlterTable
ALTER TABLE "applications" ADD COLUMN     "active_capacity_slot" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "assigned_reviewer" TEXT,
ADD COLUMN     "maturity_classification" TEXT,
ADD COLUMN     "missing_evidence" TEXT,
ADD COLUMN     "next_action" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "payment_status" TEXT,
ADD COLUMN     "qualification_result" TEXT;
