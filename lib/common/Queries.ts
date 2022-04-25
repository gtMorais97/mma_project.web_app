export class lastEventQueries {

    //#region ranks
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
    //#endregion ranks

    //#region maxes
    //---------STRIKING---------//
    //#region total

    public static maxSignificantStrikesQuery = `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        significant_strikes_per_fight.significant_strikes_landed as "max"

        FROM significant_strikes_per_fight

        JOIN fighters AS fighters1
        ON fighters1.id = significant_strikes_per_fight.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = significant_strikes_per_fight.opponent_id

        WHERE significant_strikes_per_fight.significant_strikes_landed = (SELECT MAX(significant_strikes_landed) from significant_strikes_per_fight)
        ORDER BY date desc
    `

    public static maxKnockdownsQuery = `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name, 
        knockdowns_per_fight.knockdowns as "max"

        FROM knockdowns_per_fight

        JOIN fighters AS fighters1
        ON fighters1.id = knockdowns_per_fight.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = knockdowns_per_fight.opponent_id

        WHERE knockdowns_per_fight.knockdowns = (SELECT MAX(knockdowns) from knockdowns_per_fight)
        ORDER BY date desc
    `

    public static maxHeadStrikesQuery = `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name, 
        significant_head_per_fight.significant_head_landed as "max"

        FROM significant_head_per_fight

        JOIN fighters AS fighters1
        ON fighters1.id = significant_head_per_fight.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = significant_head_per_fight.opponent_id

        WHERE significant_head_per_fight.significant_head_landed = (SELECT MAX(significant_head_landed) from significant_head_per_fight)
        ORDER BY date desc
    `

    public static maxBodyStrikesQuery = `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name, 
        significant_body_per_fight.significant_body_landed as "max"
        
        FROM significant_body_per_fight

        JOIN fighters AS fighters1
        ON fighters1.id = significant_body_per_fight.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = significant_body_per_fight.opponent_id

        WHERE significant_body_per_fight.significant_body_landed = (SELECT MAX(significant_body_landed) from significant_body_per_fight)
        ORDER BY date desc
    `

    public static maxLegStrikesQuery = `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name, 
        significant_leg_per_fight.significant_leg_landed as "max"
        
        FROM significant_leg_per_fight

        JOIN fighters AS fighters1
        ON fighters1.id = significant_leg_per_fight.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = significant_leg_per_fight.opponent_id

        WHERE significant_leg_per_fight.significant_leg_landed = (SELECT MAX(significant_leg_landed) from significant_leg_per_fight)
        ORDER BY date desc
    `

    public static maxDistanceStrikesQuery = `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name, 
        significant_distance_per_fight.significant_distance_landed as "max"
        
        FROM significant_distance_per_fight

        JOIN fighters AS fighters1
        ON fighters1.id = significant_distance_per_fight.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = significant_distance_per_fight.opponent_id

        WHERE significant_distance_per_fight.significant_distance_landed = (SELECT MAX(significant_distance_landed) from significant_distance_per_fight)
        ORDER BY date desc
    `

    //#endregion total
    //#region perMinute

    public static maxSignificantStrikesPerMinuteQuery = `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.significant_strikes_landed/(CAST(v.total_time as decimal)/60) as "max"

        FROM significant_strikes_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE CAST(v.significant_strikes_landed as decimal)/v.total_time = (
            SELECT MAX("value") FROM (
                SELECT CAST(v2.significant_strikes_landed as decimal)/v2.total_time as "value",
                v2.total_time
                FROM significant_strikes_per_fight as v2
                ) aux
            where aux.total_time >= 60
            ) 
        ORDER BY date desc
    `

    public static maxHeadStrikesPerMinuteQuery = `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.significant_head_landed/(CAST(v.total_time as decimal)/60) as "max"

        FROM significant_head_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE CAST(v.significant_head_landed as decimal)/v.total_time = (
            SELECT MAX("value") FROM (
                SELECT CAST(v2.significant_head_landed as decimal)/v2.total_time as "value",
                v2.total_time
                FROM significant_head_per_fight as v2
                ) aux
            where aux.total_time >= 60
            ) 
        ORDER BY date desc
    `

    public static maxBodyStrikesPerMinuteQuery = `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.significant_body_landed/(CAST(v.total_time as decimal)/60) as "max"

        FROM significant_body_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE CAST(v.significant_body_landed as decimal)/v.total_time = (
            SELECT MAX("value") FROM (
                SELECT CAST(v2.significant_body_landed as decimal)/v2.total_time as "value",
                v2.total_time
                FROM significant_body_per_fight as v2
                ) aux
            where aux.total_time >= 60
            ) 
        ORDER BY date desc
    `

    public static maxLegStrikesPerMinuteQuery = `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.significant_leg_landed/(CAST(v.standing_time as decimal)/60) as "max"

        FROM significant_leg_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE CAST(v.significant_leg_landed as decimal)/v.standing_time = (
            SELECT MAX("value") FROM (
                SELECT CAST(v2.significant_leg_landed as decimal)/v2.standing_time as "value",
                v2.standing_time
                FROM significant_leg_per_fight as v2
                ) aux
            where aux.standing_time >= 60
            ) 
        ORDER BY date desc
    `

    public static maxDistanceStrikesPerMinuteQuery = `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.significant_distance_landed/(CAST(v.standing_time as decimal)/60) as "max"

        FROM significant_distance_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE CAST(v.significant_distance_landed as decimal)/v.standing_time = (
            SELECT MAX("value") FROM (
                SELECT CAST(v2.significant_distance_landed as decimal)/v2.standing_time as "value",
                v2.standing_time
                FROM significant_distance_per_fight as v2
                ) aux
            where aux.standing_time >= 60
            ) 
        ORDER BY date desc
    `

    //#endregion perMinute

    //---------GRAPPLING---------//
    //#region total

    public static maxTakedownsQuery = `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.takedowns_landed as "max"

        FROM takedowns_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE v.takedowns_landed = (SELECT MAX(takedowns_landed) from takedowns_per_fight) 
        ORDER BY date desc
    `

    public static maxSubmissionAttemptsQuery = `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.submission_attempts as "max"

        FROM submissions_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE v.submission_attempts = (SELECT MAX(submission_attempts) from submissions_per_fight) 
        ORDER BY date desc
    `

    //#endregion total
    //#region perMinute

    public static maxTakedownsPerMinuteQuery = `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.takedowns_landed/(CAST(v.standing_time as decimal)/60) as "max"

        FROM takedowns_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE CAST(v.takedowns_landed as decimal)/v.standing_time = (
            SELECT MAX("value") FROM (
                SELECT CAST(v2.takedowns_landed as decimal)/v2.standing_time as "value",
                v2.standing_time
                FROM takedowns_per_fight as v2
                ) aux
            where aux.standing_time >= 60
            ) 
        ORDER BY date desc
    `

    public static maxGroundStrikesPerMinuteQuery = `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.significant_ground_landed/(CAST(v.grappling_time as decimal)/60) as "max"

        FROM significant_ground_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE CAST(v.significant_ground_landed as decimal)/v.grappling_time = (
            SELECT MAX("value") FROM (
                SELECT CAST(v2.significant_ground_landed as decimal)/v2.grappling_time as "value",
                v2.grappling_time
                FROM significant_ground_per_fight as v2
                ) aux
            where aux.grappling_time >= 60
            ) 
        AND v.grappling_time > 0

         
        ORDER BY date desc
    `

    //#endregion perMinute

    //-----------TIME-----------//
    //#region time

    public static fastestFinishQuery = `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        rounds.total_time as "max"

        FROM rounds

        JOIN fighters AS fighters1
        ON fighters1.id = rounds.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = rounds.opponent_id

        JOIN fights
        ON fights.id = rounds.fight_id and rounds.fighter_id = fights.winning_fighter_id

        WHERE rounds.total_time = (SELECT MIN(total_time) 
								   from (select total_time, round_number from rounds where rounds.fighter_id != 1739 and rounds.opponent_id != 1739) r2
								   
								   WHERE r2.round_number=1) 
        AND rounds.round_number=1
    `

    public static maxControlTimeQuery = `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.control_time as "max",
        to_char(to_timestamp(v.control_time) , 'MI:SS') as time

        FROM control_per_fight v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE v.control_time = (SELECT MAX(control_time) from control_per_fight v2)         
    `

    public static maxControlPerTadedownQuery = `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.control_per_takedown as "max",
        to_char(to_timestamp(v.control_per_takedown) , 'MI:SS') as time

        FROM control_per_takedown_per_fight v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE v.control_per_takedown = (SELECT MAX(control_per_takedown) from control_per_takedown_per_fight v2)
    `

    //#endregion time

    //#endregion maxes
}
