# Profile Management Journey

## 1. Access Profile
- Click "Profile" in navigation header
- System verifies authentication status
- Redirects to login if not authenticated

## 2. View Profile
- System displays current profile information:
  - Academic year
  - Subjects and predicted grades
  - Location preferences
  - Skills
- All fields are read-only in view mode

## 3. Initiate Edit
- Click "Edit Profile" button
- System switches form to edit mode
- All fields become editable

## 4. Update Information
- Modify any field in the form
- Subject/grade pairs can be added/removed
- Skills can be toggled on/off
- Location preferences can be updated

## 5. Save Changes
- Click "Save Changes" button
- System validates input formats
- Shows loading state during save
- Displays success message on save
- Returns to view mode with updated data

## 6. Error Handling
- Shows validation errors for invalid inputs
- Displays error message if save fails
- Maintains form state on error