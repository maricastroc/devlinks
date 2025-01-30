<?php

namespace App\Mail;

use App\Models\Campaign;
use App\Models\CampaignMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EmailCampaign extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    /**
     * @param \App\Models\Campaign $campaign
     */
    public function __construct(
        public Campaign $campaign,
        public CampaignMail $mail
    )
    {

    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->campaign->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mail.email-campaign',
            with: [
                'body' => $this->getBody()
            ]
        );
    }

    public function getBody() {
        $pattern = '/href="([^"]*)"/';
    
        preg_match_all($pattern, $this->campaign->body, $matches);

        $body = $this->campaign->body;

        foreach ($matches[1] as $index => $oldValue) {
            $newValue = 'href="' . route('tracking.clicks', ['mail' => $this->mail->id, 'url' => $oldValue]) . '"';
            $body = substr_replace($body, $newValue, strpos($body, $matches[0][$index]), strlen($matches[0][$index]));
        }

        return $body;
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
