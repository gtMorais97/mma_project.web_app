export class lastEventQueries {

    //---------STRIKING---------//
    //#region total

    public static significantStrikesQuery = `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, SUM(rounds.significant_strikes_landed) as value, events.name as event
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id
        
        WHERE aux.value > 0
    `

    public static distanceStrikesQuery = `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, SUM(rounds.significant_head_landed) as value, events.name as event
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id
        
        WHERE aux.value > 0
    `

    public static headStrikesQuery = `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, SUM(rounds.significant_head_landed) as value, events.name as event
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id
        
        WHERE aux.value > 0
    `

    public static bodyStrikesQuery = `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, SUM(rounds.significant_body_landed) as value, events.name as event
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value > 0
    `

    public static legStrikesQuery = `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, SUM(rounds.significant_leg_landed) as value, events.name as event
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id
        
        WHERE aux.value > 0
    `

    public static knockdownsQuery = `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, SUM(rounds.knockdowns) as value, events.name as event
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value > 0
    `
    //#endregion total
    //#region perMinute

    public static significantStrikesPerMinuteQuery = `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            SUM(rounds.significant_strikes_landed)/(CAST(SUM(rounds.total_time) AS DECIMAL)/60) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            HAVING SUM(rounds.total_time) >=60
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value > 0
    `

    public static distanceStrikesPerMinuteQuery = `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            SUM(rounds.significant_distance_landed)/(CAST(SUM(rounds.standing_time) AS DECIMAL)/60) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            HAVING SUM(rounds.standing_time) >= 60
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id
        
        WHERE aux.value > 0
    `

    public static headStrikesPerMinuteQuery = `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            SUM(rounds.significant_head_landed)/(CAST(SUM(rounds.total_time) AS DECIMAL)/60) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            HAVING SUM(rounds.total_time) >= 60
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value > 0
    `

    public static bodyStrikesPerMinuteQuery = `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            SUM(rounds.significant_body_landed)/(CAST(SUM(rounds.total_time) AS DECIMAL)/60) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            HAVING SUM(rounds.total_time) >= 60
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value > 0
    `

    public static legStrikesPerMinuteQuery = `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            SUM(rounds.significant_leg_landed)/(CAST(SUM(rounds.standing_time) AS DECIMAL)/60) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            HAVING SUM(rounds.standing_time) >= 60
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value > 0
    `
    //#endregion perMinute

    //---------GRAPPLING---------//
    //#region total

    public static takedownsQuery = `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, SUM(rounds.takedowns_landed) as value, events.name as event
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            HAVING SUM(rounds.takedowns_landed) > 0
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value > 0
    `

    public static takedownAccuracyQuery = `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            CAST(SUM(rounds.takedowns_landed) AS decimal)/SUM(rounds.takedowns_attempted) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            HAVING SUM(rounds.takedowns_attempted) >= 3
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value > 0
    `

    public static takedownsDefendedQuery = `
        SELECT aux.*, fighters.name as fighter_name
        FROM    
        (
            SELECT fighters.name as opponent_name, rounds.opponent_id as fighter_id, events.name as event,
            SUM(rounds.takedowns_attempted) - SUM(rounds.takedowns_landed) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY opponent_name, rounds.opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.fighter_id

        WHERE aux.value > 0
    `

    public static takedownDefenceQuery = `
        SELECT aux.*, fighters.name as fighter_name
        FROM    
        (
            SELECT fighters.name as opponent_name, rounds.opponent_id as fighter_id, events.name as event,
            1-(CAST(SUM(rounds.takedowns_landed) as decimal)/SUM(rounds.takedowns_attempted)) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY opponent_name, rounds.opponent_id, event
            HAVING SUM(rounds.takedowns_attempted) >= 3
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.fighter_id

        WHERE aux.value > 0
    `

    public static subAttemptsQuery = `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            SUM(rounds.submission_attempts) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value>0
    `
    //#endregion total
    //#region perMinute

    public static groundStrikesPerMinuteQuery = `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            SUM(rounds.significant_ground_landed)/(CAST(SUM(rounds.control_time + rounds.controlled_time) AS DECIMAL)/60) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            HAVING SUM(rounds.control_time + rounds.controlled_time) > 60
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value > 0
    `

    public static takedownsPerMinute = `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            SUM(rounds.takedowns_landed)/(CAST(SUM(rounds.standing_time) AS DECIMAL)/60) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            HAVING SUM(rounds.takedowns_landed) >= 2 AND SUM(rounds.standing_time) >= 60
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value > 0
    `
    //#endregion perMinute

    //-----------TIME-----------//
    //#region 

    public static fastestFinishesQuery = `
        SELECT aux.*, fighters.name as opponent_name
        FROM(
            SELECT fighters.name as fighter_name,
                fights.winning_fighter_id as fighter_id, 
                fights.losing_fighter_id as opponent_id, 
                (fights.ending_round_time+((fights.ending_round-1)*300)) as value,
                to_char(to_timestamp((fights.ending_round_time+((fights.ending_round-1)*300))) , 'MI:SS') as time,
                events.name as event
            FROM fighters

            JOIN fights
            ON fighters.id = fights.winning_fighter_id

            JOIN events
            ON fights.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)
            AND (fights.ending_round_time*fights.ending_round) < 60*5*3
            order by time asc
            ) aux
        JOIN fighters
        ON fighters.id = aux.opponent_id
    `

    public static controlQuery = `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            SUM(rounds.control_time) as value, 
            to_char(to_timestamp(SUM(rounds.control_time)) , 'MI:SS') as time
            
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            HAVING SUM(rounds.takedowns_landed) > 0
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value > 0
    `

    public static controlPerTakedownQuery = `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            CAST(SUM(rounds.control_time) AS DECIMAL)/SUM(rounds.takedowns_landed) as value,
            to_char(to_timestamp(CAST(SUM(rounds.control_time) AS DECIMAL)/SUM(rounds.takedowns_landed)), 'MI:SS') as time
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            HAVING SUM(rounds.takedowns_landed) > 0
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value > 0
    `

    //#endregion 
}
