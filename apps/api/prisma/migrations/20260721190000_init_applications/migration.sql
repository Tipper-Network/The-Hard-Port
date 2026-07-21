-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL,
    "form" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "founder_name" TEXT NOT NULL,
    "business_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact_phone" TEXT,
    "core_offer" TEXT NOT NULL,
    "paying_customers" TEXT NOT NULL,
    "delivery_history" TEXT NOT NULL,
    "operating_status" TEXT NOT NULL,
    "founder_continuation" TEXT NOT NULL,
    "online_activity" TEXT,
    "primary_problems" TEXT,
    "available_records" TEXT,
    "discovery_source" TEXT NOT NULL,
    "willingness_examine" BOOLEAN NOT NULL,
    "willingness_evidence" BOOLEAN NOT NULL,
    "willingness_feedback" BOOLEAN NOT NULL,
    "crisis_indicators" TEXT,
    "privacy_ack" BOOLEAN NOT NULL,
    "client_id" TEXT,
    "lifecycle_status" TEXT NOT NULL DEFAULT 'application_submitted',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "applications_email_idx" ON "applications"("email");

-- CreateIndex
CREATE INDEX "applications_lifecycle_status_idx" ON "applications"("lifecycle_status");
