-- AlterTable
ALTER TABLE "applications" ADD COLUMN     "discovery_source_video" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birth_date" DATE,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "hometown" TEXT,
ADD COLUMN     "inferred_country" TEXT,
ADD COLUMN     "locale" TEXT,
ADD COLUMN     "phone_country_code" TEXT,
ADD COLUMN     "timezone" TEXT;
