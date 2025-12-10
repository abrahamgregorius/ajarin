-- Stored procedures for shop and ranking system

-- Function to handle item purchase (deduct coins and create purchase record)
CREATE OR REPLACE FUNCTION purchase_item(p_user_id uuid, p_item_id uuid, p_price integer)
RETURNS json AS $$
DECLARE
    user_coins integer;
    result json;
BEGIN
    -- Get current user coins
    SELECT coins INTO user_coins
    FROM public.profiles
    WHERE id = p_user_id;

    -- Check if user has enough coins
    IF user_coins < p_price THEN
        RAISE EXCEPTION 'Insufficient coins';
    END IF;

    -- Deduct coins
    UPDATE public.profiles
    SET coins = coins - p_price, updated_at = now()
    WHERE id = p_user_id;

    -- Create purchase record
    INSERT INTO public.user_purchases (user_id, item_id)
    VALUES (p_user_id, p_item_id);

    -- Return success
    result := json_build_object('success', true, 'message', 'Purchase successful');
    RETURN result;

EXCEPTION
    WHEN OTHERS THEN
        result := json_build_object('success', false, 'message', SQLERRM);
        RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment study hours
CREATE OR REPLACE FUNCTION increment_study_hours(p_user_id uuid, p_hours numeric)
RETURNS void AS $$
BEGIN
    UPDATE public.profiles
    SET study_hours = COALESCE(study_hours, 0) + p_hours, updated_at = now()
    WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;