import { MedusaRequest, MedusaResponse } from '@medusajs/framework'

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const { nafath_token, national_id } = req.body
  
  try {
    const response = await fetch(`${process.env.NAFATH_API_URL}/auth/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NAFATH_API_KEY}`
      },
      body: JSON.stringify({
        token: nafath_token,
        national_id: national_id
      })
    })

    if (!response.ok) {
      return res.status(401).json({ 
        error: 'Invalid Nafath authentication' 
      })
    }

    const nafathData = await response.json()
    
    const governmentService = req.scope.resolve('government')
    const official = await governmentService.listAndCountGovernmentOfficials({
      nafath_id: nafathData.sub
    })

    if (!official || official[1] === 0) {
      return res.status(404).json({ 
        error: 'Government official not found' 
      })
    }

    res.json({
      success: true,
      official: official[0][0],
      nafath_data: nafathData
    })
  } catch (error) {
    res.status(500).json({ 
      error: 'Authentication failed',
      message: (error as Error).message 
    })
  }
}
