from supabase import create_client
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Supabase credentials
supabase_url = 'https://gcbuvmwdmifdgzuyfqzt.supabase.co'
supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjYnV2bXdkbWlmZGd6dXlmcXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwOTY5MDMsImV4cCI6MjA3MTY3MjkwM30.1J2EEEhr0Zc4OpItQ6_1iByYegtIaniGUkAQ_qKmtFQ'

# Create Supabase client
supabase = create_client(supabase_url, supabase_key)